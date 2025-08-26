import { api } from "@/utils/api/apiClient"

export interface GetUserInfoResponse {
  userId: string
  email: string
  nickName: string
  age?: number
  gender: string
  height: number
  weight: number
  characterId: number
  characterColor: string
}

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  const response = await api.get<GetUserInfoResponse>(`/user/info`)
  return response
}
