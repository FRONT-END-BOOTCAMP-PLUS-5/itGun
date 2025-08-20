"use client"

import React from "react"
import { Button } from "@/ds/components/atoms/button/Button"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
  const handleLogout = () => {
    signOut()
  }

  return (
    <div className="logout-button flex w-full items-center justify-center">
      <Button variant="underline" size="xs" onClick={handleLogout}>
          로그아웃
      </Button>
    </div>
  )
}

export default LogoutButton
