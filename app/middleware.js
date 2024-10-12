import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();

  // Get token and role from cookies
  const token = req.cookies.get("authToken");
  const role = req.cookies.get("userRole");

  // Redirect to login if not authenticated
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Role-based route protection
  if (
    url.pathname.startsWith("/dashboard/super-admin") &&
    role !== "super admin"
  ) {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  if (
    url.pathname.startsWith("/dashboard/site-admin") &&
    role !== "site admin"
  ) {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  if (
    url.pathname.startsWith("/dashboard/district-admin") &&
    role !== "district admin"
  ) {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Continue if everything checks out
}
