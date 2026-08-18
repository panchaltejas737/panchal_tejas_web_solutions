import { SignJWT, jwtVerify } from "jose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "ptws_admin_token";
const TOKEN_EXPIRY = "7d";

// Used in API routes (Node runtime) — creating the token on login
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// Used in Node runtime API routes — verifying token
export function verifyTokenNode(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Used in middleware.js (Edge runtime) — jsonwebtoken does NOT work on Edge,
// so we use `jose` here instead, which is Edge-compatible
export async function verifyTokenEdge(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

// Guards every admin API route — since middleware.js only covers
// /x9k2-control-panel/:path* pages, NOT /api/* routes, every admin
// API handler must call this to confirm the request is authenticated.
export function getAuthUser(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyTokenNode(token);
}