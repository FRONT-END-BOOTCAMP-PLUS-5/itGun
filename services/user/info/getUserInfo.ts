import { api } from "@/utils/api/apiClient"

export interface GetUserInfoResponse {
  id: string
  nickname: string
  height: number
  weight: number
  age: string
  gender: string
}

export const getUserInfo = async (
  userId: string
): Promise<GetUserInfoResponse> => {
  const response = await api.post<GetUserInfoResponse>(`/api/user/info`, {
    userId,
  })
  return response
}
