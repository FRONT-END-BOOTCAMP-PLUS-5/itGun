"use client"
import { Button } from "@/ds/components/atoms/button/Button"
import { C1 } from "@/ds/components/atoms/text/TextWrapper"
import { useRouter } from "next/navigation"

const AuthFooter = () => {
  const router = useRouter()

  const onClickSignup = () => {
    router.push("/signup")
  }

  return (
    <div className="fixed bottom-0 z-10 flex w-screen max-w-[430px] flex-col gap-[10px] bg-[var(--color-white-200)] px-[20px] py-[10px]">
      <Button isFullWidth={true}>Sign in</Button>
      <div className="flex items-center justify-between">
        <C1 variant="secondary">아직 회원이 아니신가요?</C1>
        <Button variant="ghost" size="xs" onClick={onClickSignup}>
          <C1 variant="secondary">Sign up</C1>
        </Button>
      </div>
    </div>
  )
}

export default AuthFooter
