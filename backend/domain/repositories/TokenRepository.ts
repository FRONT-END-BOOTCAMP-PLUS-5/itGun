export interface TokenInfo {
  userId: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  accessTokenExpiry: number
  refreshTokenExpiry: number
}

export interface RefreshResult {
  accessToken: string
  expiry: number
  userId: string
}

export interface TokenRepository {
  generateTokenPair(userInfo: TokenInfo): AuthTokens
  verifyAccessToken(token: string): TokenInfo | null
  refreshAccessToken(refreshToken: string): RefreshResult | null
}
