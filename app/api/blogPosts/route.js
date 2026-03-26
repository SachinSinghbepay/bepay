import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { requireAuth, ADMIN_ROLE } from "@/lib/cms-auth";

const VALID_STATUSES = new Set(["draft", "published"]);
const SLUG_RE        = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HTTP_URL_RE    = /^https?:\/\/.+/;
const MAX_LIMIT      = 500;
const DEFAULT_LIMIT  = 100;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status   = searchParams.get("status");
    const slug     = searchParams.get("slug");
    const rawLimit = searchParams.get("limit");

    // Public: published posts (by list or by slug)
    // Auth required: draft posts or listing all posts (dashboard)
    const isPublic = status === "published" || slug;
    if (!isPublic) {
      const { authError } = await requireAuth(req);
      if (authError) return authError;
    }

    if (status && !VALID_STATUSES.has(status)) {
      return NextResponse.json({ success: false, error: "Invalid status value" }, { status: 400 });
    }

    const limit = rawLimit
      ? Math.min(Math.max(1, parseInt(rawLimit, 10) || 1), MAX_LIMIT)
      : DEFAULT_LIMIT;

    await connectDB();

    if (slug) {
      const filter = status ? { slug, status } : { slug };
      const post = await Post.findOne(filter).lean();
      if (!post) return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: post });
    }

    const filter = status ? { status } : {};
    const posts  = await Post.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    return NextResponse.json({ success: true, data: posts });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { authError, user } = await requireAuth(req);
    if (authError) return authError;

    let body;
    try { body = await req.json(); }
    catch { return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 }); }

    const { title, slug, content, excerpt, coverImage, tags, categories, status, metaTitle, metaDesc } = body;

    if (!title?.trim() || !content) {
      return NextResponse.json({ success: false, error: "Title and content are required" }, { status: 400 });
    }
    if (tags !== undefined && !Array.isArray(tags)) {
      return NextResponse.json({ success: false, error: "tags must be an array" }, { status: 400 });
    }
    if (categories !== undefined && !Array.isArray(categories)) {
      return NextResponse.json({ success: false, error: "categories must be an array" }, { status: 400 });
    }
    if (status !== undefined && !VALID_STATUSES.has(status)) {
      return NextResponse.json({ success: false, error: "Invalid status value" }, { status: 400 });
    }
    if (status === "published" && user.role !== ADMIN_ROLE) {
      return NextResponse.json({ success: false, error: "Only admins can publish posts" }, { status: 403 });
    }
    if (slug !== undefined && slug !== "" && !SLUG_RE.test(slug)) {
      return NextResponse.json({ success: false, error: "slug must be lowercase alphanumeric with hyphens only" }, { status: 400 });
    }
    if (coverImage !== undefined && coverImage !== "" && !HTTP_URL_RE.test(coverImage)) {
      return NextResponse.json({ success: false, error: "coverImage must be a valid http or https URL" }, { status: 400 });
    }

    await connectDB();
    const post = await Post.create({
      title, slug, content, excerpt, coverImage,
      tags: tags ?? [],
      categories: categories ?? [],
      status: status ?? "draft",
      metaTitle: metaTitle ?? "",
      metaDesc: metaDesc ?? "",
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (err) {
    if (err.name === "ValidationError") return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    if (err.code === 11000) return NextResponse.json({ success: false, error: "A post with this slug already exists" }, { status: 400 });
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
