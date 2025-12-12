"use client"
import { Header } from "@/ds/components/molecules/header/Header"
import { usePathname, useRouter } from "next/navigation"
import { useDialogStore } from "@/hooks/useDialogStore"

const LogsHeader = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { showDialog } = useDialogStore()

  const handleBack = () => {
    showDialog({
      message: "작성 중인 기록이 저장되지 않습니다.\n정말 뒤로 가시겠습니까?",
      variant: "error",
      buttons: [
        {
          text: "네",
          onClick: () => {
            if (pathname === "/logs") {
              router.push("/")
            } else {
              router.back()
            }
          },
        },
        { text: "아니요", onClick: () => {} },
      ],
    })
  }

  return <Header className="fixed top-0" onBack={handleBack} />
}

export default LogsHeader
