"use client"
import { H1 } from "@/ds/components/atoms/text/TextWrapper"
import { useSession } from "next-auth/react"
import CharacterDownloadButton from "@/app/components/CharacterDownloadButton"
import { useRouter } from "next/navigation"
import { Button } from "@/ds/components/atoms/button/Button"
import { useLoginGuard } from "@/hooks/useLoginGuard"

const MainUserTitle = () => {
  const { data: session } = useSession()
  const loginGuard = useLoginGuard()
  const router = useRouter()

  const handleNicknameClick = () => {
    loginGuard(() => {
      router.push("/user")
    })
  }

  return (
    <div className="relative mt-[40px] flex items-center justify-center gap-3">
      <Button
        variant="ghost"
        size="xs"
        className="z-2"
        onClick={handleNicknameClick}
      >
        <H1>{session?.user?.nickName ?? "벌키"}님</H1>
      </Button>
      <CharacterDownloadButton
        userNickName={session?.user?.nickName}
        className="absolute -top-10 right-0 z-30"
      />
    </div>
  )
}

export default MainUserTitle
