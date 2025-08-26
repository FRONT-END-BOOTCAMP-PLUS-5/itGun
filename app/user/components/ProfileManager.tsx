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

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleBackClick = () => {
    setIsEditMode(false)
  }

  // userInfo가 undefined일 수 있으므로 안전하게 처리
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full bg-gray-300"></div>
          <div className="text-lg text-gray-600">
            사용자 정보를 불러오는 중...
          </div>
        </div>
      </div>
    )
  }

  if (error || !userInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          사용자 정보를 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  // 그 외의 경우는 항상 메인 화면 표시
  return (
    <>
      {/* UserInfoHeader - 설정 아이콘 조건부 표시 */}
      <UserInfoHeader
        onEditClick={handleEditClick}
        showSettingIcon={!isEditMode}
        userInfo={userInfo}
        isLoading={false}
      />

      {/* 메인 콘텐츠 */}
      {isEditMode ? (
        // 설정 아이콘 클릭 시: ProfileEdit 컴포넌트 표시
        <ProfileEdit />
      ) : (
        // 기본 모드: ProfileDisplay만 표시 (첫 화면)
        <ProfileDisplay userInfo={userInfo} />
      )}
    </>
  )
}

export default ProfileManager
