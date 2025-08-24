"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Dialog from "@/ds/components/molecules/dialog/Dialog"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { usePostUserInfo } from "@/hooks/usePostUserInfo"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import { useToastStore } from "@/hooks/useToastStore"
import type { GetUserInfoResponse } from "@/services/user/info/getUserInfo"
import { getTestSession, getTestUserInfo, isTestMode } from "@/utils/testAuth"

interface ProfileEditProps {
  onBack: () => void
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ onBack }) => {
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [nickname, setNickname] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")

  const { data: session, status } = useSession()
  const postUserInfoMutation = usePostUserInfo()
  const { showToast } = useToastStore()

  // 테스트 모드 상태 확인
  const testMode = isTestMode()
  const testSession = testMode ? getTestSession() : null
  const testUserInfo = testMode ? getTestUserInfo() : null

  const userId =
    (testMode ? testSession?.user?.id : session?.user?.id) ||
    (testMode ? testSession?.user?.email : session?.user?.email)

  const { data: userInfo, error } = useGetUserInfo(userId || "")

  // API response로 기본값 설정 (실제 사용자 정보가 있을 때만)
  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname || "")
      setHeight(userInfo.height?.toString() || "")
      setWeight(userInfo.weight?.toString() || "")
      setAge(userInfo.age || "")
      setGender(userInfo.gender || "")
    }
  }, [userInfo])

  // 세션 상태 디버깅
  console.log("ProfileEdit - 테스트 모드:", testMode)
  console.log("ProfileEdit - 세션 상태:", status)
  console.log("ProfileEdit - 세션 데이터:", session)
  console.log("ProfileEdit - 테스트 세션:", testSession)
  console.log("ProfileEdit - 사용자 정보:", userInfo)
  console.log("ProfileEdit - 테스트 사용자 정보:", testUserInfo)

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

  const handleSaveClick = async () => {
    try {
      // 입력값 검증
      if (!nickname.trim()) {
        showToast({
          message: "닉네임을 입력해주세요",
          variant: "error",
          position: "bottom",
        })
        return
      }

      if (!height.trim()) {
        showToast({
          message: "키를 입력해주세요",
          variant: "error",
          position: "bottom",
        })
        return
      }

      if (!weight.trim()) {
        showToast({
          message: "몸무게를 입력해주세요",
          variant: "error",
          position: "bottom",
        })
        return
      }

      if (!age) {
        showToast({
          message: "나이를 선택해주세요",
          variant: "error",
          position: "bottom",
        })
        return
      }

      if (!gender) {
        showToast({
          message: "성별을 선택해주세요",
          variant: "error",
          position: "bottom",
        })
        return
      }

      // 저장 중 상태로 변경
      setIsSaving(true)
      showToast({
        message: "저장 중입니다...",
        variant: "info",
        position: "bottom",
        duration: 2000,
      })

      // 세션에서 사용자 ID 가져오기
      const currentUserId = userId
      console.log("저장할 사용자 ID:", currentUserId)

      if (!currentUserId) {
        console.log("사용자 ID를 찾을 수 없음")
        showToast({
          message: "사용자 정보를 찾을 수 없습니다",
          variant: "error",
          position: "bottom",
        })
        setIsSaving(false)
        return
      }

      // 저장할 데이터 구성
      const userData = {
        userId: currentUserId,
        nickname: nickname.trim(),
        height: parseInt(height) || 0,
        weight: parseInt(weight) || 0,
        age: age,
        gender: gender,
      }

      console.log("저장할 데이터:", userData)

      // React Query mutation을 사용하여 API 호출
      await postUserInfoMutation.mutateAsync(userData)

      showToast({
        message: "저장이 완료되었습니다",
        variant: "success",
        position: "bottom",
        duration: 3000,
      })

      // 저장 완료 후 잠시 대기 후 페이지 이동
      setTimeout(() => {
        onBack() // 저장 후 표시 모드로 돌아가기
      }, 1500) // 1.5초 후 이동
    } catch (error) {
      console.error("저장 API 호출 중 오류:", error)
      showToast({
        message: "저장 중 오류가 발생했습니다",
        variant: "error",
        position: "bottom",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleWithdrawClick = () => {
    console.log("탈퇴하기 버튼 클릭됨")
    setShowWithdrawDialog(true)
    console.log("showWithdrawDialog 상태:", true)
  }

  const handleWithdrawConfirm = async () => {
    try {
      console.log("탈퇴 확인 - API 호출 시작")

      // 세션에서 사용자 ID 가져오기
      const currentUserId = userId

      if (!currentUserId) {
        console.log("사용자 ID를 찾을 수 없습니다")
        setShowWithdrawDialog(false)
        showToast({
          message: "사용자 정보를 찾을 수 없습니다",
          variant: "error",
          position: "bottom",
        })
        return
      }

      console.log("탈퇴 API 호출 - 사용자 ID:", currentUserId)

      const response = await fetch("/api/user/info", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId }),
      })

      if (response.ok) {
        // 탈퇴 성공
        console.log("탈퇴 성공")
        setShowWithdrawDialog(false)
        showToast({
          message: "탈퇴가 완료되었습니다",
          variant: "success",
          position: "bottom",
          duration: 3000,
        })

        // 잠시 후 홈페이지로 리다이렉트
        setTimeout(() => {
          window.location.href = "/"
        }, 2000)
      } else {
        // 탈퇴 실패
        console.log("탈퇴 처리 실패:", response.status)
        setShowWithdrawDialog(false)
        showToast({
          message: "탈퇴 처리 중 오류가 발생했습니다",
          variant: "error",
          position: "bottom",
        })
      }
    } catch (error) {
      console.log("탈퇴 API 호출 중 오류:", error)
      setShowWithdrawDialog(false)
      showToast({
        message: "네트워크 오류가 발생했습니다",
        variant: "error",
        position: "bottom",
      })
    }
  }

  const handleWithdrawCancel = () => {
    setShowWithdrawDialog(false)
  }

  // 로딩 중일 때 표시 (세션이 로딩 중이거나 사용자 정보가 로딩 중일 때)
  if (status === "loading") {
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

  // 에러가 있을 때 (세션이 인증된 상태에서만 에러 체크)
  if (error && status === "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          사용자 정보를 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-white-200)]">
      {/* 사용자 정보 입력 필드 */}
      <div className="mx-auto max-w-md p-6">
        <div className="space-y-8">
          {/* 닉네임 필드 */}
          <div className="space-y-2">
            <Input
              onChange={(e) => setNickname(e.target.value)}
              size="lg"
              isFullWidth={true}
            />
            {nickname && nickname.length >= 2 && (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <span>✓</span>
                <span>2글자 이상</span>
              </div>
            )}
          </div>

          {/* 키 필드 */}
          <div className="space-y-2">
            <Input
              onChange={(e) => setHeight(e.target.value)}
              type="number"
              size="lg"
              isFullWidth={true}
            />
          </div>

          {/* 몸무게 필드 */}
          <div className="space-y-2">
            <Input
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              size="lg"
              isFullWidth={true}
            />
          </div>

          {/* 나이 필드 */}
          <div className="space-y-2">
            <Dropdown
              options={ageOptions}
              value={age}
              onChange={(value) => setAge(value.toString())}
              size="lg"
            />
          </div>

          {/* 성별 필드 */}
          <div className="space-y-2">
            <Dropdown
              options={genderOptions}
              value={gender}
              onChange={(value) => setGender(value.toString())}
              size="lg"
            />
          </div>
        </div>

        {/* 하단 버튼들 */}
        <div className="mt-12 space-y-4">
          {/* 저장 버튼 */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={handleSaveClick}
              size="lg"
              isFullWidth={true}
              disabled={isSaving}
            >
              {isSaving ? "저장 중..." : "저장"}
            </Button>
          </div>

          {/* 탈퇴 버튼 */}
          <div className="flex justify-end pr-4">
            <button
              onClick={handleWithdrawClick}
              className="text-sm text-gray-500 underline"
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>

      {/* Dialog */}
      {showWithdrawDialog && (
        <Dialog
          message="캐릭터와 운동 기록이 모두 사라져요 💔\n정말 탈퇴하시겠어요?"
          variant="error"
          buttons={[
            {
              text: "네",
              onClick: handleWithdrawConfirm,
            },
            {
              text: "아니요",
              onClick: handleWithdrawCancel,
            },
          ]}
        />
      )}
    </div>
  )
}

export default ProfileEdit
