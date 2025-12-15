"use client"
import { Header } from "@/ds/components/molecules/header/Header"
import { usePathname, useRouter } from "next/navigation"
import { useDialogStore } from "@/hooks/useDialogStore"
import { useLogsStore } from "@/hooks/useLogsStore"

const LogsHeader = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { showDialog } = useDialogStore()
  const { setInit } = useLogsStore()

  const handleBack = () => {
    if (pathname === "/logs") {
      showDialog({
        message:
          "작성 중인 기록이\n저장되지 않습니다.\n정말 뒤로 가시겠습니까?",
        variant: "error",
        buttons: [
          {
            text: "네",
            onClick: () => {
              setInit()
              router.push("/")
            },
          },
          { text: "아니요", onClick: () => {} },
        ],
      })
    } else {
      router.back()
    }
  }

  return <Header className="fixed top-0" onBack={handleBack} />
}

export default LogsHeader
