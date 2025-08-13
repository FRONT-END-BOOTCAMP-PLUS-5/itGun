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
  }
}
