import { NextResponse } from "next/server";

const CMS = process.env.CMS_API_URL;

export async function GET(_req, { params }) {
  const { id } = await params;
  const res  = await fetch(`${CMS}/api/blogPosts/${id}`, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const res  = await fetch(`${CMS}/api/blogPosts/${id}`, {
    method:  "PATCH",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const res  = await fetch(`${CMS}/api/blogPosts/${id}`, { method: "DELETE" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
