import { api } from "@/utils/api/apiClient"

interface Response {
  userId: string
  email: string
  nickName: string
  age?: number
  gender?: string
  height?: number
  weight?: number
  characterId?: number
  characterColor?: string
}

export const getUserInfo = () => {
  const endpoint = `/user/info`
  return api.get<Response>(endpoint)
}
