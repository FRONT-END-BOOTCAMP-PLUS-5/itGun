"use client"
import { H1 } from "@/ds/components/atoms/text/TextWrapper"
import { useSession } from "next-auth/react"
import CharacterDownloadButton from "@/app/components/CharacterDownloadButton"

const MainUserTitle = () => {
  const { data: session } = useSession()
  return (
    <div className="mt-[40px] flex items-center justify-center gap-3">
      <H1>{session?.user?.nickName ?? "벌키"}님</H1>
      <CharacterDownloadButton
        userNickName={session?.user?.nickName}
        className="z-30"
      />
    </div>
  )
}

export default MainUserTitle
