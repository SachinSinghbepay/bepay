import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const CMS = process.env.CMS_API_URL;

async function authHeader() {
  const token = (await cookies()).get("blog_cms_token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function GET(_req, { params }) {
  const { id } = await params;
  const res  = await fetch(`${CMS}/api/blogPosts/${id}`, {
    cache:   "no-store",
    headers: await authHeader(),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const res  = await fetch(`${CMS}/api/blogPosts/${id}`, {
    method:  "PATCH",
    headers: { "Content-Type": "application/json", ...await authHeader() },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const res  = await fetch(`${CMS}/api/blogPosts/${id}`, {
    method:  "DELETE",
    headers: await authHeader(),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
