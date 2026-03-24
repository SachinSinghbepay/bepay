import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const CMS = process.env.CMS_API_URL;

export async function POST(req) {
  const token    = cookies().get("blog_cms_token")?.value;
  const formData = await req.formData();
  const res      = await fetch(`${CMS}/api/upload`, {
    method:  "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body:    formData,
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
