// API 호출 예시
import { api } from "../../utils/api/apiClient"

export interface User {
  userId: string
  nickname: string
  age?: number
  gender?: string
  height?: number
  weight?: number
  characterColor: string
  characterId: string
}

export interface SigninResponse {
  message: string
  user?: User
}

export interface SigninRequest {
  email: string
  password: string
}

export const signin = (data: SigninRequest) =>
  api.post<SigninResponse>("/signin", data)
