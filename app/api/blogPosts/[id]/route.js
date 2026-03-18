import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

// GET /api/posts/:id
export async function GET(_req, { params }) {
  try {
    await connectDB();
    const post = await Post.findById(params.id).lean();
    if (!post) return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: post });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 });
  }
}

// PATCH /api/posts/:id — update fields (including status draft→published)
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const post = await Post.findById(params.id);
    if (!post) return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });

    Object.assign(post, body);
    await post.save(); // triggers pre-save hooks (publishedAt, etc.)

    return NextResponse.json({ success: true, data: post });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/posts/:id
export async function DELETE(_req, { params }) {
  try {
    await connectDB();
    const post = await Post.findByIdAndDelete(params.id);
    if (!post) return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Post deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 });
  }
}