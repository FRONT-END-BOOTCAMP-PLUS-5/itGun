import { NextRequest, NextResponse } from "next/server"
import { JwtTokenRepository } from "@/backend/infrastructure/repositories/JwtTokenRepository"
import type { TokenRepository } from "@/backend/domain/repositories/TokenRepository"

//미들웨어에서 사용할 토큰 검증 API
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { accessToken, refreshToken } = body

    if (!accessToken) {
      return NextResponse.json(
        {
          valid: false,
          error: "ACCESS_TOKEN_MISSING",
        },
        { status: 401 }
      )
    }

    const tokenRepository: TokenRepository = new JwtTokenRepository()

    const tokenInfo = tokenRepository.verifyAccessToken(accessToken)

    if (tokenInfo) {
      return NextResponse.json({
        valid: true,
        userId: tokenInfo.userId,
      })
    }

    if (!refreshToken) {
      return NextResponse.json(
        {
          valid: false,
          error: "REFRESH_TOKEN_MISSING",
        },
        { status: 401 }
      )
    }

    const newTokens = tokenRepository.refreshAccessToken(refreshToken)

    if (!newTokens) {
      return NextResponse.json(
        {
          valid: false,
          error: "REFRESH_TOKEN_INVALID",
        },
        { status: 401 }
      )
    }

    return NextResponse.json({
      valid: true,
      userId: newTokens.userId,
      newAccessToken: newTokens.accessToken,
      newExpiry: newTokens.expiry,
    })
  } catch (error) {
    return NextResponse.json(
      {
        valid: false,
        error: "SERVER_ERROR",
      },
      { status: 500 }
    )
  }
}
