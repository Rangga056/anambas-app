import { NextResponse } from "next/server";
import { useAuthStore } from "@/store/useAuthStore"; // Adjust the import path based on your folder structure

export async function middleware(req) {
  const url = req.nextUrl; // Get the current request URL
  const { isAuthenticated, role } = useAuthStore.getState(); // Get Zustand store state

  // Fetch user data if not already authenticated
  if (!authStore.isAuthenticated) {
    await authStore.fetchUser(); // Ensure the user is fetched
  }

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Role-based route protection
  console.log(role);

  if (
    url.pathname.startsWith("/dashboard/super-admin") &&
    role !== "superadmin"
  ) {
    url.pathname = "/403"; // Unauthorized page
    return NextResponse.redirect(url);
  }

  if (
    url.pathname.startsWith("/dashboard/site-admin") &&
    role !== "siteadmin"
  ) {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  if (
    url.pathname.startsWith("/dashboard/district-admin") &&
    role !== "districtadmin"
  ) {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Proceed if everything checks out
}
