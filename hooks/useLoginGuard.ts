"use client"

import { useToastStore } from "@/hooks/useToastStore"
import { useSession } from "next-auth/react"

export const useLoginGuard = () => {
  const { data: session } = useSession()
  const { showToast } = useToastStore()

  const guard = (action: () => void) => {
    if (session?.user) {
      action()
    } else {
      showToast({
        message: "로그인이 필요한 서비스 입니다.",
        variant: "error",
        position: "top",
        duration: 1300,
      })
    }
  }

  return guard
}
