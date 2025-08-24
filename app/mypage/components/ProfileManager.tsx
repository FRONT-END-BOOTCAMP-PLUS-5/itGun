"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import UserInfoHeader from "./UserInfoHeader"
import ProfileDisplay from "./ProfileDisplay"
import ProfileEdit from "./ProfileEdit"
import type { GetUserInfoResponse } from "@/services/user/info/getUserInfo"

const ProfileManager = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const { data: session, status } = useSession()
  const userId = session?.user?.id || session?.user?.email

  const { data: userInfo, isLoading, error } = useGetUserInfo(userId || "")

  // 디버깅을 위한 로그
  console.log("ProfileManager - 세션 상태:", status)
  console.log("ProfileManager - 세션 데이터:", session)
  console.log("ProfileManager - 사용자 ID:", userId)
  console.log("ProfileManager - 사용자 정보:", userInfo)
  console.log("ProfileManager - 로딩 상태:", isLoading)
  console.log("ProfileManager - 에러:", error)

  // 테스트용 임시 사용자 정보 (GetUserInfoResponse 타입에 맞게 수정)
  const mockUserInfo: GetUserInfoResponse = {
    id: "test-user-id",
    nickname: "근육멋사",
    height: 186,
    weight: 87,
    age: "30",
    gender: "male",
  }

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleBackClick = () => {
    setIsEditMode(false)
  }

  // 테스트용으로 항상 사용자 정보 표시 (세션 체크 완전 우회)
  // userInfo가 GetUserInfoResponse 타입인지 확인하고 안전하게 처리
  const currentUserInfo: GetUserInfoResponse =
    (userInfo as GetUserInfoResponse) || mockUserInfo

  // 세션이 로딩 중일 때만 로딩 화면 표시
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full bg-gray-300"></div>
          <div className="text-lg text-gray-600">
            인증 정보를 확인하는 중...
          </div>
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
