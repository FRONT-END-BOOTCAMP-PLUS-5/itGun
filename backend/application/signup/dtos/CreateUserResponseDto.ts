export interface CreateUserResponseDto {
  message: string
  status: number
  error?: string
  accessToken?: string
  refreshToken?: string
}
