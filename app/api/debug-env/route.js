import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  const env = {
    JWT_SECRET: !!process.env.JWT_SECRET,
    JWT_EXPIRES_IN: !!process.env.JWT_EXPIRES_IN,
    MONGODB_URI: !!process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
  };

  try {
    await connectDB();
    return NextResponse.json({ ...env, mongodb: "connected" });
  } catch (err) {
    return NextResponse.json({ ...env, mongodb: "failed", error: err?.message });
  }
}
