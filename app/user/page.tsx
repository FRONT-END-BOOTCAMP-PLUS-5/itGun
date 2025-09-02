"use client"

import { useState } from "react"
import UserInfo from "./components/UserInfo"
import UserProfile from "./components/UserProfile"

const User = () => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <>
      <UserProfile isEdit={isEdit} setIsEdit={setIsEdit} />
      <UserInfo isEdit={isEdit} setIsEdit={setIsEdit} />
    </>
  )
}

export default User
