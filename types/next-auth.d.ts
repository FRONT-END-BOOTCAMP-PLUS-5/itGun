import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    nickName: string
    age?: number
    gender?: string
    height?: number
    weight?: number
    characterColor: string
    characterId: number
    accessToken?: string
    refreshToken?: string
    accessTokenExpiry?: number
    refreshTokenExpiry?: number
  }

  interface Session {
    user: {
      id: string
      email: string
      nickName: string
      age?: number
      gender?: string
      height?: number
      weight?: number
      characterColor: string
      characterId: number
      accessToken: string | undefined
      refreshToken: string | undefined
      accessTokenExpiry: number | undefined
      refreshTokenExpiry: number | undefined
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    nickName: string
    age?: number
    gender?: string
    height?: number
    weight?: number
    characterColor: string
    characterId: number
    accessToken?: string
    refreshToken?: string
    accessTokenExpiry?: number
    refreshTokenExpiry?: number
  }
}
