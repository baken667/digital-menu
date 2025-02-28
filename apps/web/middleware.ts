import NextAuth from "next-auth";
import { authConfig } from "./lib/auth/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isPublicRoute && !isAuthenticated) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|storage|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
