"use client"

import React, { useState } from "react"
import Header from "./components/Header"
import Card from "./components/Card"
import { Button } from "./components/Button"
import { Input } from "./components/InputBox"
import { Dropdown } from "./components/DropDown"
import Icon from "@/ds/components/atoms/icon/Icon"
import ProfileEdit from "./components/ProfileEdit"

import { useSession } from "next-auth/react"

interface ProfileData {
  nickname: string
  height: string
  weight: string
  age: string
  gender: string
}

const MyPage = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const { data: session, status } = useSession()

  // 드롭다운 옵션 정의
  const genderOptions = [
    { label: "남", value: "male" },
    { label: "여", value: "female" },
  ]

  const ageOptions = [
    { label: "10대", value: "10s" },
    { label: "20대", value: "20s" },
    { label: "30대", value: "30s" },
    { label: "40대", value: "40s" },
  ]

  const handleEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <div>
      <span>
        <Header onSettingClick={() => {}} onEditClick={handleEditClick} />

        <span>
          <ProfileEdit isEditMode={isEditMode} onEditClick={handleEditClick} />
        </span>

        <div className="space-y-4 p-4"></div>
      </span>
    </div>
  )
}

export default MyPage
