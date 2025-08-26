"use client"

import React, { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import Icon from "@/ds/components/atoms/icon/Icon"
import { B1 } from "@/ds/components/atoms/text/TextWrapper"
import { usePostUserInfo } from "@/hooks/usePostUserInfo"
import { useToastStore } from "@/hooks/useToastStore"
import { useDialogStore } from "@/hooks/useDialogStore"

import { useDeleteUser } from "@/hooks/useDeleteUser"

import type { ProfileEditProps } from "./types/ProfileEdit.types"

const ProfileEdit: React.FC<ProfileEditProps> = ({ onBack }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [nickname, setNickname] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState<number>(20)
  const [gender, setGender] = useState("")
  const [validation, setValidation] = useState({
    nickname: true,
    height: true,
    weight: true,
    age: true,
    gender: true,
  })

  // formData 객체 생성
  const formData = {
    age: age.toString(),
  }

  // handleDropdownChange 함수 정의
  const handleDropdownChange = (field: string) => (value: string | number) => {
    if (field === "age") {
      setAge(Number(value))
    }
  }

  const { data: session, status } = useSession()
  const router = useRouter()
  const postUserInfoMutation = usePostUserInfo()
  const postUserInfoMutationRef = useRef(postUserInfoMutation)
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
        router.push("/")
      }, 2000)
    },
    onError: () => {
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
      // 나이 값이 있으면 사용, 없으면 기본값으로 "20대" 설정
      setAge(user.age || 20)
      setGender(user.gender || "")
    }
  }, [session])

  // 드롭다운 옵션 정의
  const genderOptions = [
    { label: "남", value: "male" },
    { label: "여", value: "female" },
    { label: "선택안함", value: "none" },
  ]

  // 나이 옵션 추가
  const ageOptions = [
    { label: "10대", value: 10 },
    { label: "20대", value: 20 },
    { label: "30대", value: 30 },
    { label: "40대", value: 40 },
  ]

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

      console.log("💾 저장할 사용자 데이터:", userData)
      console.log("🔍 나이 값 상세:", {
        age: age,
        ageType: typeof age,
        ageOptions: ageOptions,
        selectedAge: ageOptions.find((option) => option.value === age),
      })

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
                options={Array.from({ length: 100 }, (_, i) => ({
                  label: `${i + 1}세`,
                  value: String(i + 1),
                }))}
                value={age.toString()}
                onChange={(value) => {
                  console.log("🎯 나이 선택됨:", value)
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
              disabled={!Object.values(validation).every(Boolean) || isSaving}
              variant={
                !Object.values(validation).every(Boolean) || isSaving
                  ? "disable"
                  : "primary"
              }
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
