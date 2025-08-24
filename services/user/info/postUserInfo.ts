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
  // 테스트 모드 체크 (브라우저와 서버 모두에서 작동)
  const isTestMode = () => {
    if (typeof window !== "undefined") {
      // 브라우저 환경
      return (
        window.location.hostname === "localhost" &&
        process.env.NEXT_PUBLIC_TEST_MODE === "true"
      )
    }
    // 서버 환경
    return process.env.NEXT_PUBLIC_TEST_MODE === "true"
  }

  // 테스트 모드일 때는 API 호출을 시뮬레이션
  if (isTestMode()) {
    console.log("테스트 모드: API 호출 시뮬레이션", data)
    console.log("환경 변수:", process.env.NEXT_PUBLIC_TEST_MODE)
    console.log(
      "호스트명:",
      typeof window !== "undefined" ? window.location.hostname : "server"
    )

    // 실제 API 호출 대신 성공 응답 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "테스트 모드에서 저장 완료",
        })
      }, 500) // 0.5초 지연으로 실제 API 호출처럼 보이게
    })
  }

  console.log("실제 API 호출 모드")

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
