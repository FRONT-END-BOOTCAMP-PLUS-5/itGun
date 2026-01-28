import { useMutation } from "@tanstack/react-query"
import {
  createUserLogs,
  CreateLogRequest,
} from "@/services/user/logs/createUserLogs"
import { useToastStore } from "@/hooks/useToastStore"
import { useRouter } from "next/navigation"
import { useExerciseLogStore } from "@/hooks/useExerciseLogStore"

export const useCreateUserLogs = () => {
  const { showToast } = useToastStore()
  const router = useRouter()
  const { setInit } = useExerciseLogStore()

  return useMutation({
    mutationFn: (data: CreateLogRequest) => createUserLogs(data),
    onSuccess: (response) => {
      setInit()

      if (response.awardedBadges && response.awardedBadges.length > 0) {
        router.push("/")
        showToast({
          message: `운동 기록이 저장되었습니다! 🎉\n${response.awardedBadges.length}개의 뱃지를 획득했습니다!`,
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
    onError: () => {
      showToast({
        message: "운동 기록 저장에 실패했습니다 😢 다시 시도해주세요",
        variant: "error",
        position: "top",
      })
    },
  })
}
