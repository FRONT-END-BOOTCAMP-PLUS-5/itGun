import React, { useState } from "react"
import { useSession } from "next-auth/react"
import Toast from "@/ds/components/molecules/toast/Toast"
import Dialog from "@/ds/components/molecules/dialog/Dialog"
import ProfileDisplay from "./ProfileDisplay"
import Icon from "@/ds/components/atoms/icon/Icon"
import { Dropdown } from "./DropDown"
import { svgList } from "@/static/svgs/svgList"
import Header from "./Header"
import { Button } from "./Button"

interface ProfileEditProps {
  isEditMode: boolean
  onEditClick: () => void
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
  isEditMode,
  onEditClick,
}) => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [nickname, setNickname] = useState("멋사")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const { data: session, status } = useSession()

  // 세션 상태 디버깅
  console.log("세션 상태:", status)
  console.log("세션 데이터:", session)

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
    onEditClick()
  }

  const handleSaveClick = async () => {
    try {
      // 세션에서 사용자 ID 가져오기
      console.log("세션 전체 데이터:", session)
      console.log("세션 사용자:", session?.user)
      console.log("사용자 ID:", session?.user?.id)
      console.log("사용자 이메일:", session?.user?.email)

      const userId = session?.user?.id || session?.user?.email

      if (!userId) {
        console.log("사용자 ID를 찾을 수 없음")
        setToastMessage("사용자 정보를 찾을 수 없습니다")
        setShowToast(true)
        return
      }

      // 저장할 데이터 구성
      const userData = {
        userId,
        nickname,
        height: parseInt(height) || 0,
        weight: parseInt(weight) || 0,
        age: age,
        gender: gender,
      }

      console.log("저장할 데이터:", userData)

      // API 호출하여 사용자 정보 업데이트
      const response = await fetch("/api/user/info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        setToastMessage("저장이 완료되었습니다")
        setShowToast(true)
        onEditClick() // 저장 후 편집 모드 해제
      } else {
        setToastMessage("저장 중 오류가 발생했습니다")
        setShowToast(true)
      }
    } catch (error) {
      console.error("저장 API 호출 중 오류:", error)
      setToastMessage("네트워크 오류가 발생했습니다")
      setShowToast(true)
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
      const userId = session?.user?.id || session?.user?.email

      if (!userId) {
        console.log("사용자 ID를 찾을 수 없습니다")
        setShowWithdrawDialog(false)
        setToastMessage("사용자 정보를 찾을 수 없습니다")
        setShowToast(true)
        return
      }

      console.log("탈퇴 API 호출 - 사용자 ID:", userId)

      const response = await fetch("/api/user/info", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        // 탈퇴 성공
        console.log("탈퇴 성공")
        setShowWithdrawDialog(false)
        setToastMessage("탈퇴가 완료되었습니다")
        setShowToast(true)

        // 잠시 후 홈페이지로 리다이렉트
        setTimeout(() => {
          window.location.href = "/"
        }, 2000)
      } else {
        // 탈퇴 실패
        console.log("탈퇴 처리 실패:", response.status)
        setShowWithdrawDialog(false)
        setToastMessage("탈퇴 처리 중 오류가 발생했습니다")
        setShowToast(true)
      }
    } catch (error) {
      console.log("탈퇴 API 호출 중 오류:", error)
      setShowWithdrawDialog(false)
      setToastMessage("네트워크 오류가 발생했습니다")
      setShowToast(true)
    }
  }

  const handleWithdrawCancel = () => {
    setShowWithdrawDialog(false)
  }

  return (
    <div className="relative min-h-screen bg-white">
      {!isEditMode ? (
        <ProfileDisplay onEditClick={handleEditClick} />
      ) : (
        <div className="mx-auto max-w-md space-y-10 p-6">
          {/* 입력 필드 및 드롭다운 */}
          <div className="space-y-10">
            <div>
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="h-10 w-full border-b border-gray-300 px-2 text-[var(--color-primary)] placeholder-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-0 focus:outline-none"
              />
            </div>

            <div>
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-10 w-full border-b border-gray-300 px-2 text-[var(--color-primary)] placeholder-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-0 focus:outline-none"
              />
            </div>

            <div>
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-10 w-full border-b border-gray-300 px-2 text-[var(--color-primary)] placeholder-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-0 focus:outline-none"
              />
            </div>

            <div>
              <Dropdown
                options={ageOptions}
                value={age}
                onChange={(value) => setAge(String(value))}
                placeholder="연령대 선택"
                variant="secondary"
              />
            </div>

            <div>
              <Dropdown
                options={genderOptions}
                value={gender}
                onChange={(value) => setGender(String(value))}
                placeholder="성별 선택"
                variant="secondary"
              />
            </div>
          </div>

          {/* 탈퇴하기 링크 - 연령대별 선택 드롭박스와 간격 100px */}
          <div className="flex justify-end pt-[100px]">
            <button
              onClick={handleWithdrawClick}
              className="text-gray-500 underline transition-colors hover:text-gray-700"
            >
              탈퇴하기
            </button>
          </div>

          {/* 저장 버튼 */}
          <div className="pt-[41px]">
            <Button
              onClick={handleSaveClick}
              variant="save"
              className="h-16 w-full"
            />
          </div>

          {/* 추가 입력 필드 */}
        </div>
      )}

      {showToast && (
        <Toast
          message={toastMessage}
          variant="secondary-blue"
          position="bottom"
          duration={3000}
          onDismiss={() => setShowToast(false)}
        />
      )}

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
