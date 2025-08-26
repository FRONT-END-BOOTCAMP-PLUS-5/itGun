"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import Icon from "@/ds/components/atoms/icon/Icon"
import { B1 } from "@/ds/components/atoms/text/TextWrapper"
import { usePostUserInfo } from "@/hooks/usePostUserInfo"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import { useToastStore } from "@/hooks/useToastStore"
import { useDialogStore } from "@/hooks/useDialogStore"

import { useDeleteUser } from "@/hooks/useDeleteUser"

import type { ProfileEditProps } from "./types/ProfileEdit.types"

const ProfileEdit: React.FC<ProfileEditProps> = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [nickname, setNickname] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState<number>(1)
  const [gender, setGender] = useState("")

  const { data: session, status, update } = useSession()
  const router = useRouter()
  const postUserInfoMutation = usePostUserInfo()
  const { showToast } = useToastStore()

  const { showDialog } = useDialogStore()
  const userId = session?.user?.id || session?.user?.email

  // 사용자 정보를 직접 가져오기
  const { data: userInfo } = useGetUserInfo(userId || "")
  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      // 탈퇴 성공 시 토스트 메시지 표시
      showToast({
        message: "탈퇴가 완료되었습니다",
        variant: "success",
        position: "bottom",
        duration: 3000,
      })

      // 잠시 후 홈페이지로 리다이렉트
      setTimeout(() => {
        router.push("/")
      }, 2000)
    },
    onError: (error: Error) => {
      // 탈퇴 실패 시 에러 토스트 메시지 표시
      console.error("탈퇴 처리 중 오류:", error)
      showToast({
        message: "탈퇴 처리 중 오류가 발생했습니다",
        variant: "error",
        position: "bottom",
      })
    },
  })

  // 드롭다운 옵션 정의
  const genderOptions = [
    { label: "남자", value: "male" },
    { label: "여자", value: "female" },
    { label: "선택안함", value: "none" },
  ]

  // 나이 옵션 정의
  const ageOptions = Array.from({ length: 93 }, (_, i) => ({
    label: `${i + 8}세`,
    value: String(i + 8),
  }))

  // 사용자 정보를 직접 가져와서 기본값 설정
  useEffect(() => {
    if (userInfo) {
      // API에서 가져온 사용자 정보를 사용
      setNickname(userInfo.nickName || "")
      setHeight(userInfo.height?.toString() || "")
      setWeight(userInfo.weight?.toString() || "")
      // 나이 값이 있으면 사용, 없으면 기본값으로 "1세" 설정
      setAge(userInfo.age || 1)
      setGender(userInfo.gender || "")
    }
  }, [userInfo, postUserInfoMutation.isSuccess])

  const handleSaveClick = async () => {
    try {
      // 입력값 검증 - 닉네임과 나이 필수값
      if (!nickname.trim()) {
        showToast({
          message: "닉네임을 입력해주세요",
          variant: "error",
          position: "bottom",
        })
        return
      }

      if (!age || age === 0) {
        showToast({
          message: "나이를 선택해주세요",
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

      if (!currentUserId) {
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
        nickName: nickname.trim(),
        height: parseInt(height) || 0,
        weight: parseInt(weight) || 0,
        age: age.toString(), // number를 string으로 변환하여 저장
        gender: gender,
      }

      // React Query mutation을 사용하여 API 호출
      await postUserInfoMutation.mutateAsync(userData)

      // 저장 완료 후 세션 업데이트하여 최신 정보 반영
      await update()

      // 저장 완료 후 바로 페이지 이동
      router.back() // 저장 후 뒤로 가기
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
    showDialog({
      variant: "error",
      message: "정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      buttons: [
        {
          text: "네",
          onClick: handleWithdrawConfirm,
        },
        {
          text: "아니요",
          onClick: () => {
            // 취소 시 아무것도 하지 않음
          },
        },
      ],
    })
  }

  const handleWithdrawConfirm = async () => {
    // 세션에서 사용자 ID 가져오기
    const currentUserId = userId

    if (!currentUserId) {
      showToast({
        message: "사용자 정보를 찾을 수 없습니다",
        variant: "error",
        position: "bottom",
      })
      return
    }

    // useDeleteUser 훅 사용 (성공/실패는 훅의 콜백에서 처리)
    deleteUserMutation.mutate()
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
  if (!session?.user && status === "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          사용자 정보를 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-[var(--color-white-200)]">
      {/* 사용자 정보 입력 필드 */}
      <div className="mx-auto max-w-md p-6">
        <div className="space-y-8">
          {/* 입력 필드 및 드롭다운 */}
          <div className="space-y-10">
            <div>
              {/* 닉네임 필드 */}
              <div className="space-y-2">
                <Input
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  size="lg"
                  isFullWidth={true}
                  className="border-b-2"
                />
              </div>
            </div>

            {/* 키 필드 */}
            <div className="space-y-2">
              <Input
                placeholder="키 (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                size="lg"
                isFullWidth={true}
                className="border-b-2"
              />
            </div>

            {/* 몸무게 필드 */}
            <div className="space-y-2">
              <Input
                placeholder="몸무게 (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                size="lg"
                isFullWidth={true}
                className="border-b-2"
              />
            </div>

            {/* 나이 필드 */}
            <div className="space-y-2">
              <Dropdown
                placeholder="나이"
                options={ageOptions}
                value={age.toString()}
                onChange={(value) => {
                  setAge(Number(value))
                }}
              />
            </div>

            {/* 성별 필드 */}
            <div className="space-y-2">
              <Dropdown
                options={genderOptions}
                value={gender}
                onChange={(value) => setGender(value.toString())}
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼들 */}
        <div className="mt-[100px]">
          {/* 탈퇴하기 링크 */}
          <div className="mb-[51px] flex justify-end pr-4">
            <button
              onClick={handleWithdrawClick}
              className="text-sm text-gray-500 underline transition-colors hover:text-gray-700"
            >
              탈퇴하기
            </button>
          </div>

          {/* 저장 버튼 */}
          <div className="-mx-3 mt-auto">
            <Button
              isFullWidth
              onClick={handleSaveClick}
              disabled={isSaving}
              variant={isSaving ? "disable" : "primary"}
            >
              <B1 fontWeight="bold" className="!text-white-200 mr-3">
                {isSaving ? "저장 중..." : "저장"}
              </B1>
              <Icon name="save" color="white-200" size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* 탈퇴 확인 다이얼로그는 useDialogStore를 통해 표시됨 */}
    </div>
  )
}

export default ProfileEdit
