import { NextResponse } from "next/server";

const DEMO_API_URL = process.env.BLOG_CMS_AUTH_API_URL; // add this to .env when ready

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required." }, { status: 400 });
    }

    let token;

    if (DEMO_API_URL) {
      // ── Real API call (swap in when ready) ──────────────────────────────────
      const apiRes = await fetch(DEMO_API_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const apiData = await apiRes.json();
      if (!apiRes.ok || !apiData.token) {
        return NextResponse.json({ success: false, error: apiData.message || "Invalid credentials." }, { status: 401 });
      }
      token = apiData.token;
    } else {
      // ── Demo mode — hardcoded credentials ───────────────────────────────────
      if (email !== "admin@bepay.money" || password !== "bepay2026") {
        return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
      }
      token = "demo_blog_cms_token_" + Date.now();
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("blog_cms_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path:     "/",
      maxAge:   60 * 60 * 8, // 8 hours
    });
    return response;
  } catch (err) {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
