enum Gender {
  NONE = "none",
  MALE = "male",
  FEMALE = "female",
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
  error?: string
}
