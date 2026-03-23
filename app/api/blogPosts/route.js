import { NextResponse } from "next/server";

const CMS = process.env.CMS_API_URL;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const res   = await fetch(`${CMS}/api/blogPosts${query ? `?${query}` : ""}`, { cache: "no-store" });
  const data  = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req) {
  const body = await req.json();
  const res  = await fetch(`${CMS}/api/blogPosts`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
