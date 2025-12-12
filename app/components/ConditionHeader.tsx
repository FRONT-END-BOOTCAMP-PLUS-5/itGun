"use client"
import { Header } from "@/ds/components/molecules/header/Header"
import { usePathname } from "next/navigation"

const ConditionHeader = () => {
  const pathname = usePathname()
  if (pathname === "/" || pathname === "/landing") return
  return <Header className="fixed top-0" />
}

export default ConditionHeader
