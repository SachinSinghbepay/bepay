import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("blog_cms_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      success: true,
      user: {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}