"use client"
import { H1 } from "@/ds/components/atoms/text/TextWrapper"
import { useSession } from "next-auth/react"

const MainUserTitle = () => {
  const { data: session } = useSession()
  return (
    <div className="mt-[40px] flex justify-center">
      <H1>{session?.user?.nickName ?? "벌키"}님</H1>
    </div>
  )
}

export default MainUserTitle
