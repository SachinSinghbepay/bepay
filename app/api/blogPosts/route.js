import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const CMS = process.env.CMS_API_URL;

function authHeader() {
  const token = cookies().get("blog_cms_token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const res   = await fetch(`${CMS}/api/blogPosts${query ? `?${query}` : ""}`, {
    cache:   "no-store",
    headers: authHeader(),
  });
  const data  = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req) {
  const body = await req.json();
  const res  = await fetch(`${CMS}/api/blogPosts`, {
    method:  "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
