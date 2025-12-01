"use client"

import React from "react"
import { Button } from "@/ds/components/atoms/button/Button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LogInAndOutButtonProps, LogInAndOutButtonType } from "../types"

const LogInAndOutButton = ({ type }: LogInAndOutButtonProps) => {
  const router = useRouter()
  const handleLogout = () => {
    if (type === 0) {
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
        onClick={handleLogout}
      >
        {LogInAndOutButtonType[type]}
      </Button>
    </div>
  )
}

export default LogInAndOutButton
