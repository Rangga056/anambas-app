import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("Middleware triggered");

  // Extract token and role from cookies
  const token = req.cookies.get("token")?.value; // Get the Bearer token from cookies
  const role = req.cookies.get("role")?.value; // Get the role from cookies

  console.log("Token:", token);
  console.log("Role:", role);

  // Define the protected routes and required roles
  const protectedRoutes = {
    "super-admin": ["superadmin"],
    "site-admin": ["siteadmin"],
    "district-admin": ["districtadmin"],
  };

  const { pathname } = req.nextUrl;

  // Match the base dashboard path and extract the admin type
  const dashboardMatch = pathname.match(
    /^\/dashboard\/(super-admin|site-admin|district-admin)(\/.*)?$/
  );

  if (dashboardMatch) {
    const adminType = dashboardMatch[1]; // Extracted admin type, e.g., "site-admin"
    if (!token || !token.startsWith("Bearer")) {
      console.log("No Bearer token found. Redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
    }

    // Check if the user's role matches the required role for this route
    if (!protectedRoutes[adminType]?.includes(role)) {
      console.log("Unauthorized access. Redirecting to 403 page.");
      return NextResponse.redirect(new URL("/403", req.url)); // Redirect to 403 page
    }
  }

  return NextResponse.next(); // Allow the request to continue
}

export const config = {
  matcher: "/dashboard/:path*", // Match all routes under "/dashboard"
};
