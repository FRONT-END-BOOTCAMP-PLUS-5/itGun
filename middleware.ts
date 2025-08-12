import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const protectedRoutes = [
  "/",
  "/logs",
  "/menus",
  "/user",
  "/user/logs",
  "/user/logs/[id]",
  "/user/badges",
  "/user/gauges",
  "/exercises",
]

const guestOnlyRoutes = ["/landing", "/signup", "/signin"]

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/landing", request.url))
    }
  }

  if (guestOnlyRoutes.includes(request.nextUrl.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/logs",
    "/menus",
    "/user/:path*",
    "/exercises",
    "/landing",
    "/signup",
    "/signin",
  ],
}
