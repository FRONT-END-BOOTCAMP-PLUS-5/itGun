"use client"
import { Header } from "@/ds/components/molecules/header/Header"
import { usePathname, useRouter } from "next/navigation"

const LogsHeader = () => {
  const pathname = usePathname()
  const router = useRouter()

  const handleBack = () => {
    if (pathname === "/logs") {
      router.push("/")
    } else {
      router.back()
    }
  }

  return <Header className="fixed top-0" onBack={handleBack} />
}

export default LogsHeader
