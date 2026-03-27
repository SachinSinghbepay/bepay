import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    JWT_SECRET: !!process.env.JWT_SECRET,
    JWT_EXPIRES_IN: !!process.env.JWT_EXPIRES_IN,
    MONGODB_URI: !!process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
  });
}
