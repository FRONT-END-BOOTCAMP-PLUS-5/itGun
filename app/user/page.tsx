"use client"

import React from "react"
import ProfileManager from "./components/ProfileManager"

export default function UserPage() {
  return (
    <div className="flex w-full flex-col space-y-10">
      <ProfileManager />
    </div>
  )
}
