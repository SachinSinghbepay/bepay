import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const JWT_SECRET  = process.env.JWT_SECRET;
export const ADMIN_ROLE = "BEPAY_CMS_ADMIN";

export async function verifyToken(req) {
  // Try Authorization header first, then fall back to cookie
  const authHeader = req.headers.get("authorization") || "";
  let token = null;

  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  } else {
    const jar = await cookies();
    token = jar.get("blog_cms_token")?.value || null;
  }

  if (!token) {
    return { authError: _respond(401, "Missing or invalid authorization header") };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { decoded };
  } catch (err) {
    const message =
      err.name === "TokenExpiredError" ? "Token has expired" : "Invalid token";
    return { authError: _respond(401, message) };
  }
}

export async function requireAuth(req) {
  const { decoded, authError } = await verifyToken(req);
  if (authError) return { authError };
  return { user: decoded };
}

export async function requireAdmin(req) {
  const { decoded, authError } = await verifyToken(req);
  if (authError) return { authError };

  if (decoded.role !== ADMIN_ROLE) {
    return { authError: _respond(403, "Admin access required") };
  }

  return { user: decoded };
}

function _respond(status, message) {
  return NextResponse.json({ success: false, error: message }, { status });
}
