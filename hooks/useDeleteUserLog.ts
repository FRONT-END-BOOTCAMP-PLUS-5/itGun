import { useMutation } from "@tanstack/react-query"
import { deleteUserLog } from "@/services/user/logs/deleteUserLog"
import { useToastStore } from "./useToastStore"

export const useDeleteUserLog = (id: string) => {
  const { showToast } = useToastStore()

  return useMutation({
    mutationFn: () => deleteUserLog(id),
    onSuccess: () => {
      showToast({
        message: "운동 기록이 삭제되었습니다!",
        variant: "secondary-blue",
        position: "bottom",
      })
    },
    onError: () => {
      showToast({
        message: "삭제 실패 😢 잠시 후 다시 시도해주세요",
        variant: "error",
        position: "bottom",
      })
    },
  })
}
