import { useMutation } from "@tanstack/react-query"
import { useToastStore } from "./useToastStore"
import { Request, updateUserInfo } from "@/services/user/info/updateUserInfo"

export const useUpdateUserInfo = () => {
  const { showToast } = useToastStore()

  return useMutation({
    mutationFn: (data: Request) => updateUserInfo(data),
    onSuccess: (res) => {
      if (res.message === "success") {
        showToast({
          message: "저장이 완료되었습니다!",
          variant: "info",
          position: "bottom",
          duration: 3000,
        })
      } else if (res.message === "error") {
        showToast({
          message: "다시 시도해주세요😥",
          variant: "error",
          position: "bottom",
          duration: 3000,
        })
      }
    },
  })
}
