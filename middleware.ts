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
  console.log("🔺미들웨어 토큰 확인", token)

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      console.log(
        "🚫 미들웨어 인증되지 않은 사용자 - 401 에러 반환",
        Date.now()
      )
      return NextResponse.redirect(new URL("/landing", request.url))
    }
    console.log("✅ 미들웨어 인증된 사용자 - 접근 허용", Date.now(), "토큰:")
  }

  if (guestOnlyRoutes.includes(request.nextUrl.pathname)) {
    if (token) {
      console.log(
        "🔄 로그인된 사용자가 Guest Only 페이지 접근 - 메인으로 리다이렉트"
      )
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
