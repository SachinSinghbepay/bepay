import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { stringToSign } = await req.json();

  if (!stringToSign) {
    return NextResponse.json(
      { error: "stringToSign is required" },
      { status: 400 }
    );
  }

  const secret = process.env.HMAC_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "HMAC secret not configured" },
      { status: 500 }
    );
  }

  const signature = createHmac("sha256", secret)
    .update(stringToSign)
    .digest("hex");

  return NextResponse.json({ signature });
}