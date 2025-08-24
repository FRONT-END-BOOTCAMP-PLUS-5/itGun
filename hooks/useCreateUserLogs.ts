import { useMutation } from "@tanstack/react-query"
import {
  createUserLogs,
  CreateLogRequest,
} from "@/services/user/logs/createUserLogs"
import { useToastStore } from "@/hooks/useToastStore"
import { useRouter } from "next/navigation"

export const useCreateUserLogs = () => {
  const { showToast } = useToastStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: CreateLogRequest) => createUserLogs(data),
    onSuccess: (response) => {
      if (response.awardedBadges && response.awardedBadges.length > 0) {
        router.push("/")
        showToast({
          message: `운동 기록이 저장되었습니다! 🎉 ${response.awardedBadges.length}개의 배지를 획득했습니다!`,
          variant: "success",
          position: "top",
        })
      } else {
        router.push("/")
        showToast({
          message: "운동 기록이 저장되었습니다! 💪",
          variant: "success",
          position: "top",
        })
      }
    },
    onError: (error) => {
      console.log(error)
      showToast({
        message: "운동 기록 저장에 실패했습니다 😢 다시 시도해주세요",
        variant: "error",
        position: "top",
      })
    },
  })
}
