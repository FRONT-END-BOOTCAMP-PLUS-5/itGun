"use client"

import { useState } from "react"
import UserInfo from "./components/UserInfo"
import UserProfile from "./components/UserProfile"
import { useSession } from "next-auth/react"

const User = () => {
  const { data: session } = useSession()
  const [isEdit, setIsEdit] = useState(false)
  const [color, setColor] = useState(session?.user?.characterColor ?? "#fff")
  return (
    <>
      <UserProfile
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        color={color}
        setColor={setColor}
      />
      <UserInfo isEdit={isEdit} setIsEdit={setIsEdit} color={color} />
    </>
  )
}

export default User
