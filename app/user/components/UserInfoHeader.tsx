"use client"

import React from "react"
import Icon from "@/ds/components/atoms/icon/Icon"
import { Button } from "@/ds/components/atoms/button/Button"
import type { UserInfoHeaderProps } from "./types/UserInfoHeader.types"

const UserInfoHeader: React.FC<UserInfoHeaderProps> = ({
  onEditClick,
  showSettingIcon = true,
  userInfo,
  isLoading,
}) => {
  return (
    <div className="relative flex w-full flex-col items-center p-6">
      {/* 프로필 섹션 */}
      <div className="flex w-full items-center justify-between">
        {/* 프로필 사진과 닉네임 */}
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-gray-300"></div>
          <span className="text-xl font-bold text-[var(--color-primary)]">
            {isLoading ? "로딩 중..." : userInfo?.nickname || "벌키"}
          </span>
        </div>

        {/* 톱니바퀴 아이콘 - 조건부 표시 */}
        {showSettingIcon && (
          <Button variant="ghost" size="xs" onClick={onEditClick}>
            <Icon name="setting" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default UserInfoHeader
