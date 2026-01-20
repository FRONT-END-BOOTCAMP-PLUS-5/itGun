import { postUserPassword } from "@/services/user/info/postUserPassword"
import { useMutation } from "@tanstack/react-query"
import { useToastStore } from "./useToastStore"

export const useCheckPassword = (options?: { checkValid?: () => void }) => {
  const { showToast } = useToastStore()

  return useMutation({
    mutationFn: (password: string) => postUserPassword({ password }),
    onSuccess: (res) => {
      if (res.valid === true) {
        options?.checkValid?.()
        showToast({
          message: "비밀번호가 일치합니다!",
          variant: "success",
          position: "top",
          duration: 2000,
        })
      } else {
        showToast({
          message: "비밀번호가 일치하지 않습니다 🥲",
          variant: "error",
          position: "top",
        })
      }
    },
  })
}
