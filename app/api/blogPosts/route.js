import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

// GET /api/posts — fetch all posts (optionally filter by status)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // ?status=published or draft

    const filter = status ? { status } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: posts });
  } catch (err) {
    console.error("GET /api/blogPosts error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/posts — create a new post
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, slug, content, excerpt, coverImage, tags, categories, status } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Title and content are required" }, { status: 400 });
    }

    const post = await Post.create({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      tags: tags ?? [],
      categories: categories ?? [],
      status: status ?? "draft",
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  }  catch (err) {
  console.error("POST /api/blogPosts error:", err);
  return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}