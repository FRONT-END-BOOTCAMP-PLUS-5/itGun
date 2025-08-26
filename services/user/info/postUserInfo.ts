import { api } from "@/utils/api/apiClient"

export interface PostUserInfoRequest {
  nickName: string
  height: number
  weight: number
  age: string
  gender: string
  characterColor?: string
  characterId?: number
}

export interface PostUserInfoResponse {
  success: boolean
  message: string
}

export const postUserInfo = async (
  data: PostUserInfoRequest
): Promise<PostUserInfoResponse> => {
  const response = await api.put<PostUserInfoResponse>("/user/info", data)

  return response
}
