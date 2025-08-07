export interface CreateUserResponseDto {
  message: string
  status: number
  user?: {
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
  error?: string
}
