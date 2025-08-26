import React from "react"
import type { GetUserInfoResponse } from "@/services/user/info/getUserInfo"

interface ProfileDisplayProps {
  userInfo?: GetUserInfoResponse
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ userInfo }) => {
  console.log("🔍 ProfileDisplay userInfo:", userInfo)
  console.log("🔍 ProfileDisplay userInfo 타입:", typeof userInfo)
  console.log(
    "🔍 ProfileDisplay userInfo 키:",
    userInfo ? Object.keys(userInfo) : "null"
  )

  return (
    <div className="mx-auto max-w-md space-y-10 p-6">
      <div className="space-y-10">
        {/* 닉네임 필드 */}
        <div className="flex h-[30px] w-[333px] items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">
            {userInfo?.nickName || "닉네임 없음"}
          </span>
        </div>

        {/* 키 필드 */}
        <div className="flex h-[30px] w-[333px] items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">
            {userInfo?.height ? `${userInfo.height} cm` : "키 정보 없음"}
          </span>
        </div>

        {/* 몸무게 필드 */}
        <div className="flex h-[30px] w-[333px] items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">
            {userInfo?.weight ? `${userInfo.weight} kg` : "몸무게 정보 없음"}
          </span>
        </div>

        {/* 나이 필드 */}
        <div className="flex h-[30px] w-[333px] items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">
            {userInfo?.age ? `${userInfo.age}세` : "나이 정보 없음"}
          </span>
        </div>

        {/* 성별 필드 */}
        <div className="flex h-[30px] w-[333px] items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">
            {userInfo?.gender === "male"
              ? "남"
              : userInfo?.gender === "female"
                ? "여"
                : "선택안함"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileDisplay
