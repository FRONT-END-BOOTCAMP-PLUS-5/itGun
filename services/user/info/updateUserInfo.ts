import { api } from "@/utils/api/apiClient"

export interface Request {
  password?: string
  nickName: string
  height?: number
  weight?: number
  age?: number
  gender?: string
  characterColor?: string
  characterId?: number
}

interface Response {
  message: string
}

export const updateUserInfo = async (data: Request) => {
  const endpoint = `/user/info`
  return await api.put<Response>("/user/info", data)
}
