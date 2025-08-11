import { NextRequest, NextResponse } from "next/server"
import { JwtTokenRepository } from "@/backend/infrastructure/repositories/JwtTokenRepository"
import type { TokenRepository } from "@/backend/domain/repositories/TokenRepository"

//API 라우트에서 사용하는 토큰 검증 함수

export async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "토큰이 없습니다" }, { status: 401 })
  }

  const accessToken = authHeader.substring(7)
  const tokenRepository: TokenRepository = new JwtTokenRepository()

  const tokenInfo = tokenRepository.verifyAccessToken(accessToken)
  if (!tokenInfo) {
    return NextResponse.json({ error: "유효하지 않은 토큰" }, { status: 401 })
  }

  return tokenInfo // { userId: string }
}
