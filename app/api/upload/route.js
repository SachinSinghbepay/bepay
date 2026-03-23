import { NextResponse } from "next/server";

const CMS = process.env.CMS_API_URL;

export async function POST(req) {
  const formData = await req.formData();
  const res      = await fetch(`${CMS}/api/upload`, {
    method: "POST",
    body:   formData,
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
