"use client"

import React from "react"
import { Button } from "@/ds/components/atoms/button/Button"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LogInAndOutButtonType } from "@/app/menus/types"
import { C1 } from "@/ds/components/atoms/text/TextWrapper"

const LogInAndOutButton = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const handleClickSignin = () => {
    router.push("/signin")
  }

  const handleClickSignout = () => {
    if (session?.user) {
      signOut({ callbackUrl: "/" })
    }
  }

  const handleClickSignup = () => {
    router.push("/signup")
  }

  return (
    <div className="flex w-full items-center justify-center gap-2 p-[14px]">
      <Button
        variant="underline"
        isFullWidth={false}
        size="xs"
        onClick={session?.user ? handleClickSignout : handleClickSignin}
      >
        {LogInAndOutButtonType[session?.user ? 0 : 1]}
      </Button>
      {!session?.user && (
        <>
          <C1 variant="secondary" className="cursor-default">
            {" "}
            /{" "}
          </C1>
          <Button
            variant="underline"
            isFullWidth={false}
            size="xs"
            onClick={handleClickSignup}
          >
            회원가입
          </Button>
        </>
      )}
    </div>
  )
}

export default LogInAndOutButton
