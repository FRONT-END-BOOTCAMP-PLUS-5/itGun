import { Gender } from "../../../domain/entities/User"

export interface CreateAuthDto {
  email: string
  password: string
  nickName: string
  age?: number
  gender?: Gender
  height?: number
  weight?: number
  characterColor?: string
  characterId?: number
}

export interface CreateAuthResponseDto {
  message: string
  status: number
  error?: string
  accessToken?: string
  refreshToken?: string
}
