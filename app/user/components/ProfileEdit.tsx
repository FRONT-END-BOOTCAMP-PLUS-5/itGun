"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import Icon from "@/ds/components/atoms/icon/Icon"
import { usePostUserInfo } from "@/hooks/usePostUserInfo"
import { useToastStore } from "@/hooks/useToastStore"
import { useDialogStore } from "@/hooks/useDialogStore"
import DialogContainer from "@/app/components/DialogContainer"
import { useDeleteUser } from "@/hooks/useDeleteUser"

import type { ProfileEditProps, AgeOption } from "./types/ProfileEdit.types"

const ProfileEdit: React.FC<ProfileEditProps> = ({ onBack }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [nickname, setNickname] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")

  const { data: session, status } = useSession()
  const postUserInfoMutation = usePostUserInfo()
  const { showToast } = useToastStore()
  const { showDialog } = useDialogStore()
  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      // 탈퇴 성공
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
    },
    onError: (error) => {
      showToast({
        message: "탈퇴 처리 중 오류가 발생했습니다",
        variant: "error",
        position: "bottom",
      })
    },
  })

  const userId = session?.user?.id || session?.user?.email

  // 세션에서 사용자 정보를 직접 가져와서 기본값 설정
  useEffect(() => {
    if (session?.user) {
      // 세션에 저장된 사용자 정보가 있다면 사용
      const user = session.user
      setNickname(user.nickName || "")
      setHeight(user.height?.toString() || "")
      setWeight(user.weight?.toString() || "")
      setAge(user.age?.toString() || "")
      setGender(user.gender || "")
    }
  }, [session])

  // 사용자 데이터 변경 여부를 확인하는 함수
  const hasUserDataChanged = () => {
    // 초기 로딩 시에는 저장하지 않음
    if (!session?.user) {
      return false
    }

    // 실제로 값이 변경되었는지 확인
    const currentValues = {
      nickname: nickname.trim(),
      height: parseInt(height) || 0,
      weight: parseInt(weight) || 0,
      age: age,
      gender: gender,
    }

    const originalValues = {
      nickname: session.user.nickName || "",
      height: session.user.height || 0,
      weight: session.user.weight || 0,
      age: session.user.age?.toString() || "",
      gender: session.user.gender || "",
    }

    const hasChanged =
      currentValues.nickname !== originalValues.nickname ||
      currentValues.height !== originalValues.height ||
      currentValues.weight !== originalValues.weight ||
      currentValues.age !== originalValues.age ||
      currentValues.gender !== originalValues.gender

    console.log("🔍 데이터 변경 확인:", {
      current: currentValues,
      original: originalValues,
      hasChanged,
      nickname: {
        current: currentValues.nickname,
        original: originalValues.nickname,
      },
      height: {
        current: currentValues.height,
        original: originalValues.height,
      },
      weight: {
        current: currentValues.weight,
        original: originalValues.weight,
      },
      age: { current: currentValues.age, original: originalValues.age },
      gender: {
        current: currentValues.gender,
        original: originalValues.gender,
      },
    })

    return hasChanged
  }

  // 사용자 데이터가 변경될 때 자동 저장
  useEffect(() => {
    console.log("🔄 useEffect 실행:", {
      session: !!session?.user,
      userId: !!userId,
      hasChanged: hasUserDataChanged(),
      currentValues: {
        nickname: nickname.trim(),
        height: parseInt(height) || 0,
        weight: parseInt(weight) || 0,
        age: age,
        gender: gender,
      },
    })

    if (session?.user && userId && hasUserDataChanged()) {
      const userData = {
        nickname: nickname.trim() || session.user.nickName || "",
        height: parseInt(height) || 0,
        weight: parseInt(weight) || 0,
        age: age, // string으로 유지
        gender: gender,
      }

      console.log("🔄 자동 저장 실행:", userData)

      // 자동 저장 (에러 처리 없이)
      postUserInfoMutation.mutate(userData)
    }
  }, [
    height,
    weight,
    age,
    gender,
    session?.user,
    userId,
    nickname,
    // postUserInfoMutation 제거 - 무한 루프 방지
  ])

  // 드롭다운 옵션 정의
  const genderOptions = [
    { label: "남", value: "male" },
    { label: "여", value: "female" },
    { label: "선택안함", value: "none" },
  ]

  const ageOptions: AgeOption[] = [
    { label: "10대", value: "15" },
    { label: "20대", value: "25" },
    { label: "30대", value: "35" },
    { label: "40대", value: "45" },
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
        nickname: nickname.trim(),
        height: parseInt(height) || 0,
        weight: parseInt(weight) || 0,
        age: age, // string으로 유지
        gender: gender,
      }

      // React Query mutation을 사용하여 API 호출
      await postUserInfoMutation.mutateAsync(userData)

      // 저장 완료 후 바로 페이지 이동
      onBack() // 저장 후 표시 모드로 돌아가기
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
    deleteUserMutation.mutate({})
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
                options={ageOptions}
                value={age}
                onChange={(value) => setAge(String(value))}
                placeholder="연령대 선택"
                size="lg"
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
          {/* 탈퇴 버튼 */}
          <div className="mb-[51px] flex justify-end pr-4">
            <button
              onClick={handleWithdrawClick}
              className="text-sm text-gray-500 underline"
            >
              탈퇴하기
            </button>
          </div>
          {/* 저장 버튼 */}{" "}
          <div className="mb -[10px]justify-center flex">
            <Button
              variant="primary"
              onClick={handleSaveClick}
              size="lg"
              isFullWidth={true}
              disabled={isSaving}
            >
              {isSaving ? "저장 중..." : "저장"}
              <span className="ml-2">
                <Icon name="save" size={20} color="white-100" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* 탈퇴 확인 다이얼로그는 useDialogStore를 통해 표시됨 */}
      <DialogContainer />
    </div>
  )
}

export default ProfileEdit
