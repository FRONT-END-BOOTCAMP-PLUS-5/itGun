export type Gender = "none" | "male" | "female"

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  accessTokenExpiry: number
  refreshTokenExpiry: number
}

export interface SignInResponseDto {
  message: string
  status: number
  user?: {
    id: string
    email: string
    nickName: string
    age?: number
    gender?: Gender
    height?: number
    weight?: number
    characterColor: string
    characterId: number
  }
  tokens?: AuthTokens
  error?: string
}
