import { NextResponse } from "next/server";

const CMS = process.env.CMS_API_URL;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required." }, { status: 400 });
    }

    const apiRes  = await fetch(`${CMS}/api/auth/login`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password }),
    });
    const apiData = await apiRes.json();

    if (!apiRes.ok || !apiData.token) {
      return NextResponse.json(
        { success: false, error: apiData.error || "Invalid credentials." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: apiData.user,
    });

    response.cookies.set("blog_cms_token", apiData.token, {
      httpOnly: true,
      sameSite: "lax",
      path:     "/",
      maxAge:   60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
