import React from "react"
import { Input } from "@/ds/components/atoms/input/Input"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { Button } from "@/ds/components/atoms/button/Button"
import type { GetUserInfoResponse } from "@/services/user/info/getUserInfo"

interface UserInfoProps {
  userInfo?: GetUserInfoResponse
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
  // 예시 데이터 - 실제로는 props로 받거나 상태로 관리
  const ageOptions = Array.from({ length: 93 }, (_, i) => ({
    label: `${i + 8}세`,
    value: String(i + 8),
  }))

  const options = [
    { label: "남자", value: "male" },
    { label: "여자", value: "female" },
    { label: "선택안함", value: "none" },
  ]

  return (
    <div className="flex w-full flex-col gap-[40px]">
      {/* 기본 정보 */}
      <Input
        placeholder="이름을 입력해주세요"
        isFullWidth={true}
        size="lg"
        defaultValue={userInfo?.nickName || ""}
      />
      {/* 신체 정보 */}
      <Input
        placeholder="키를 입력해주세요 (cm)"
        type="number"
        isFullWidth={true}
        size="lg"
        defaultValue={userInfo?.height?.toString() || ""}
      />
      <Input
        placeholder="몸무게를 입력해주세요 (kg)"
        type="number"
        isFullWidth={true}
        size="lg"
        defaultValue={userInfo?.weight?.toString() || ""}
      />
      <Dropdown
        options={ageOptions}
        placeholder="나이를 입력해주세요"
        size="lg"
        value={userInfo?.age || ""}
      />

      <Dropdown
        options={options}
        placeholder="성별을 선택해주세요"
        size="lg"
        value={userInfo?.gender || ""}
      />

      {/* 저장하기 버튼과의 간격 208px */}
      <div className="flex justify-center pt-[208px]">
        <Button variant="primary" size="lg" isFullWidth={false}>
          저장하기
        </Button>
      </div>
    </div>
  )
}

export default UserInfo
