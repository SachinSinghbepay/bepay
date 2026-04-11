import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Topic from "@/models/Topic";
import { requireAuth } from "@/lib/cms-auth";

function toSlug(str) {
  return str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  await connectDB();
  const topics = await Topic.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, data: topics });
}

export async function POST(req) {
  const { authError } = await requireAuth(req);
  if (authError) return authError;

  await connectDB();
  const { name, color } = await req.json();

  if (!name?.trim()) {
    return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
  }

  const slug = toSlug(name);
  const existing = await Topic.findOne({ slug });
  if (existing) {
    return NextResponse.json({ success: false, error: "A topic with this name already exists" }, { status: 409 });
  }

  const topic = await Topic.create({ name: name.trim(), slug, color: color || "#3B82F6" });
  return NextResponse.json({ success: true, data: topic }, { status: 201 });
}
