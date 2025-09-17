import { useMutation } from "@tanstack/react-query"
import { useToastStore } from "./useToastStore"
import { useRouter } from "next/navigation"
import { deleteUserInfo } from "@/services/user/info/deleteUserInfo"
import { signOut } from "next-auth/react"

export const useDeleteUserInfo = () => {
  const router = useRouter()
  const { showToast } = useToastStore()

  return useMutation({
    mutationFn: () => deleteUserInfo(),
    onSuccess: () => {
      signOut({ callbackUrl: "/landing" })
      showToast({
        message: "탈퇴되었습니다.",
        variant: "info",
        position: "bottom",
      })
    },
    onError: () => {
      showToast({
        message: "탈퇴 실패 😢 잠시 후 다시 시도해주세요",
        variant: "error",
        position: "bottom",
      })
    },
  })
}
