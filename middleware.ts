import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const protectedPrefixes = ["/api"]
const protectedExact = ["/user"]
const guestOnlyRoutes = ["/signup", "/signin"]
const publicApiRoutes = ["/api/user/email", "/api/auth"]

function matchesRoutes(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    const isProtected =
      matchesRoutes(pathname, protectedPrefixes) ||
      protectedExact.includes(pathname)
    if (
      !matchesRoutes(pathname, publicApiRoutes) &&
      isProtected
    ) {
      return NextResponse.redirect(new URL("/landing", request.url))
    }
    return NextResponse.next()
  }

  if (matchesRoutes(pathname, guestOnlyRoutes)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
