import { api } from "@/utils/api/apiClient"

export interface PostUserInfoRequest {
  nickname: string
  height: number
  weight: number
  age: string
  gender: string
}

export interface PostUserInfoResponse {
  success: boolean
  message: string
}

export const postUserInfo = async (
  data: PostUserInfoRequest
): Promise<PostUserInfoResponse> => {
  const response = await api.put<PostUserInfoResponse>("/user/info", {
    user: data,
  })

  return response
}
