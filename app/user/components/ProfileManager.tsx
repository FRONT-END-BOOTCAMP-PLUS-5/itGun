"use client"

import React from "react"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"

import ProfileDisplay from "@/app/user/components/ProfileDisplay"
import ProfileEdit from "@/app/user/components/ProfileEdit"
import UserInfoHeader from "@/app/user/components/UserInfoHeader"
import type { GetUserInfoResponse } from "@/services/user/info/getUserInfo"

const ProfileManager = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const { data: session, status } = useSession()
  const userId = session?.user?.id || session?.user?.email

  const { data: userInfo, isLoading, error } = useGetUserInfo(userId || "")

  console.log("🔍 ProfileManager 상태:", {
    userId,
    userInfo,
    isLoading,
    error,
    session: !!session?.user,
  })

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleBackClick = () => {
    setIsEditMode(false)
  }

  // userInfo가 GetUserInfoResponse 타입인지 확인하고 안전하게 처리
  const currentUserInfo: GetUserInfoResponse = userInfo as GetUserInfoResponse

  console.log("🔍 currentUserInfo:", currentUserInfo)

  // 그 외의 경우는 항상 메인 화면 표시
  return (
    <>
      {/* UserInfoHeader - 설정 아이콘 조건부 표시 */}
      <UserInfoHeader
        onEditClick={handleEditClick}
        showSettingIcon={!isEditMode}
        userInfo={currentUserInfo}
        isLoading={false}
      />

      {/* 메인 콘텐츠 */}
      {isEditMode ? (
        // 설정 아이콘 클릭 시: ProfileEdit 컴포넌트 표시
        <ProfileEdit onBack={handleBackClick} />
      ) : (
        // 기본 모드: ProfileDisplay만 표시 (첫 화면)
        <ProfileDisplay userInfo={currentUserInfo} />
      )}
    </>
  )
}

export default ProfileManager
