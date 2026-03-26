import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { requireAuth, requireAdmin } from "@/lib/cms-auth";

const UPDATABLE_FIELDS = new Set([
  "title", "slug", "content", "excerpt", "coverImage",
  "tags", "categories", "status", "metaTitle", "metaDesc",
]);

const SLUG_RE     = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HTTP_URL_RE = /^https?:\/\/.+/;

export async function GET(req, { params }) {
  try {
    const { authError } = await requireAuth(req);
    if (authError) return authError;

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ success: false, error: "Invalid post ID" }, { status: 400 });
    await connectDB();
    const post = await Post.findById(id).lean();
    if (!post) return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: post });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { authError } = await requireAdmin(req);
    if (authError) return authError;

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ success: false, error: "Invalid post ID" }, { status: 400 });

    let body;
    try { body = await req.json(); }
    catch { return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 }); }

    const updates = {};
    for (const key of UPDATABLE_FIELDS) {
      if (key in body) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: false, error: "No valid fields provided for update" }, { status: 400 });
    }
    if (updates.slug !== undefined && updates.slug !== "" && !SLUG_RE.test(updates.slug)) {
      return NextResponse.json({ success: false, error: "slug must be lowercase alphanumeric with hyphens only" }, { status: 400 });
    }
    if (updates.coverImage !== undefined && updates.coverImage !== "" && !HTTP_URL_RE.test(updates.coverImage)) {
      return NextResponse.json({ success: false, error: "coverImage must be a valid http or https URL" }, { status: 400 });
    }

    await connectDB();
    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    Object.assign(post, updates);
    await post.save();
    return NextResponse.json({ success: true, data: post.toObject() });
  } catch (err) {
    if (err.name === "ValidationError") return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    if (err.code === 11000) return NextResponse.json({ success: false, error: "A post with this slug already exists" }, { status: 400 });
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { authError } = await requireAdmin(req);
    if (authError) return authError;

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ success: false, error: "Invalid post ID" }, { status: 400 });
    await connectDB();
    const post = await Post.findByIdAndDelete(id);
    if (!post) return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Post deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
