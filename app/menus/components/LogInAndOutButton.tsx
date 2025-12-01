"use client"

import React from "react"
import { Button } from "@/ds/components/atoms/button/Button"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LogInAndOutButtonType } from "@/app/menus/types"

const LogInAndOutButton = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const handleClick = () => {
    if (session?.user) {
      signOut({ callbackUrl: "/" })
    } else {
      router.push("/signin")
    }
  }

  return (
    <div className="p-[14px]">
      <Button
        variant="underline"
        isFullWidth={true}
        size="xs"
        onClick={handleClick}
      >
        {LogInAndOutButtonType[session?.user ? 0 : 1]}
      </Button>
    </div>
  )
}

export default LogInAndOutButton
