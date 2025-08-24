import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  postUserInfo,
  PostUserInfoRequest,
} from "@/services/user/info/postUserInfo"

export const usePostUserInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PostUserInfoRequest) => postUserInfo(data),
    onSuccess: () => {
      // 성공 시 사용자 정보 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["userInfo"] })
    },
    onError: (error) => {
      console.error("사용자 정보 업데이트 실패:", error)
    },
  })
}
