enum Gender {
  NONE = "none",
  MALE = "male",
  FEMALE = "female",
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  accessTokenExpiry: number
  refreshTokenExpiry: number
}

export interface CreateUserResponseDto {
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
