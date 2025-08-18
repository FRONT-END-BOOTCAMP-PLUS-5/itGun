// api 호출 예시
import { useMutation } from "@tanstack/react-query"
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

// 1. API 호출 함수
const signin = (data: SigninRequest) =>
  api.post<SigninResponse>("/signin", data)

// 2. React Query 훅
export const useSignin = () => {
  return useMutation({
    mutationFn: signin,
  })
}
