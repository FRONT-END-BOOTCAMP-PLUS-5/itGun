import jwt from "jsonwebtoken"
import type {
  TokenRepository,
  TokenInfo,
  AuthTokens,
  RefreshResult,
} from "../../domain/repositories/TokenRepository"

interface JwtPayload {
  userId: string
  type: "access" | "refresh"
  iat?: number
  exp?: number
}

const JWT_CONFIG = {
  ACCESS_EXPIRY: "1d",
  REFRESH_EXPIRY: "7d",
  ACCESS_EXPIRY_MS: 24 * 60 * 60 * 1000, // 1일
  REFRESH_EXPIRY_MS: 7 * 24 * 60 * 60 * 1000, // 7일
} as const

export class JwtTokenRepository implements TokenRepository {
  private readonly accessSecret: string
  private readonly refreshSecret: string

  constructor() {
    this.accessSecret = process.env.JWT_ACCESS_SECRET as string
    this.refreshSecret = process.env.JWT_REFRESH_SECRET as string

    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      console.warn("⚠️  JWT secrets not found in environment variables")
    }
  }

  generateTokenPair(userInfo: TokenInfo): AuthTokens {
    const accessToken = this.createAccessToken(userInfo)
    const refreshToken = this.createRefreshToken(userInfo)

    return {
      accessToken,
      refreshToken,
      accessTokenExpiry: Date.now() + JWT_CONFIG.ACCESS_EXPIRY_MS,
      refreshTokenExpiry: Date.now() + JWT_CONFIG.REFRESH_EXPIRY_MS,
    }
  }

  verifyAccessToken(token: string): TokenInfo | null {
    try {
      const decoded = jwt.verify(token, this.accessSecret) as JwtPayload

      if (decoded.type !== "access") {
        return null
      }

      return {
        userId: decoded.userId,
      }
    } catch (error) {
      return null
    }
  }

  refreshAccessToken(refreshToken: string): RefreshResult | null {
    try {
      const decoded = jwt.verify(refreshToken, this.refreshSecret) as JwtPayload

      if (decoded.type !== "refresh") {
        return null
      }

      const newAccessToken = this.createAccessToken({
        userId: decoded.userId,
      })

      return {
        accessToken: newAccessToken,
        expiry: Date.now() + JWT_CONFIG.ACCESS_EXPIRY_MS,
        userId: decoded.userId,
      }
    } catch (error) {
      return null
    }
  }

  private createAccessToken(userInfo: TokenInfo): string {
    const payload: Omit<JwtPayload, "iat" | "exp"> = {
      userId: userInfo.userId,
      type: "access",
    }

    return jwt.sign(payload, this.accessSecret, {
      expiresIn: JWT_CONFIG.ACCESS_EXPIRY,
      algorithm: "HS256",
    })
  }

  private createRefreshToken(userInfo: TokenInfo): string {
    const payload: Omit<JwtPayload, "iat" | "exp"> = {
      userId: userInfo.userId,
      type: "refresh",
    }

    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: JWT_CONFIG.REFRESH_EXPIRY,
      algorithm: "HS256",
    })
  }
}
