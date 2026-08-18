import { NextResponse } from "next/server";
import { verifyTokenEdge, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Allow the login page itself — everything else under x9k2-control-panel is protected
  if (pathname === "/x9k2-control-panel/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/x9k2-control-panel/login", request.url));
  }

  const payload = await verifyTokenEdge(token);

  if (!payload) {
    const response = NextResponse.redirect(new URL("/x9k2-control-panel/login", request.url));
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/x9k2-control-panel/:path*"],
};