import { Gender } from "../../../domain/entities/User"

export interface CreateUserRequestDto {
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
