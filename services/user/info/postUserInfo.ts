import { api } from "@/utils/api/apiClient"

export interface PostUserInfoRequest {
  userId: string
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

  // 실제 API 호출
  try {
    const response = await api.put<PostUserInfoResponse>("/api/user/info", {
      user: data,
    })

    // 응답이 예상한 형식인지 확인
    if (response && typeof response === "object" && "message" in response) {
      return {
        success: response.message === "success",
        message: response.message,
      }
    } else {
      console.error("예상하지 못한 응답 형식:", response)
      throw new Error("API 응답 형식이 올바르지 않습니다")
    }
  } catch (error) {
    console.error("postUserInfo 오류:", error)
    throw error
  }
}
