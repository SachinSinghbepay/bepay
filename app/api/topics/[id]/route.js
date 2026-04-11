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

export async function PUT(req, { params }) {
  const { authError } = await requireAuth(req);
  if (authError) return authError;

  await connectDB();
  const { name, color } = await req.json();

  if (!name?.trim()) {
    return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
  }

  const slug = toSlug(name);
  const conflict = await Topic.findOne({ slug, _id: { $ne: params.id } });
  if (conflict) {
    return NextResponse.json({ success: false, error: "A topic with this name already exists" }, { status: 409 });
  }

  const topic = await Topic.findByIdAndUpdate(
    params.id,
    { name: name.trim(), slug, color },
    { new: true }
  );
  if (!topic) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, data: topic });
}

export async function DELETE(req, { params }) {
  const { authError } = await requireAuth(req);
  if (authError) return authError;

  await connectDB();
  const topic = await Topic.findByIdAndDelete(params.id);
  if (!topic) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
