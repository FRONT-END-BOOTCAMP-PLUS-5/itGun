"use client"

import { useSession } from "next-auth/react"
import { useDialogStore } from "./useDialogStore"
import { useRouter } from "next/navigation"

export const useLoginGuard = () => {
  const { data: session } = useSession()
  const { showDialog } = useDialogStore()
  const router = useRouter()

  const guard = (action: () => void) => {
    if (session?.user) {
      action()
    } else {
      showDialog({
        message: "로그인이 필요한 서비스 입니다. 로그인하시겠습니까?",
        variant: "error",
        buttons: [
          {
            text: "로그인",
            onClick: () => {
              router.push("/signin")
            },
          },
          {
            text: "회원가입",
            onClick: () => {
              router.push("/signup")
            },
          },
        ],
      })
    }
  }

  return guard
}
