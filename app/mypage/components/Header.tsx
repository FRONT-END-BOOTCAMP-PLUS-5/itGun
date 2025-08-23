"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Icon from "@/ds/components/atoms/icon/Icon"

interface HeaderProps {
  showBackButton?: boolean
  title?: string
  titleColor?: "primary" | "black" | "blue"
  variant?: "simple" | "default"
  onBackClick?: () => void
  onSettingClick?: () => void
  onEditClick?: () => void
  isEditMode?: boolean
}

const Header: React.FC<HeaderProps> = ({
  variant = "default",
  title = "",
  titleColor = "blue",
  showBackButton = false,
  onBackClick,
  onSettingClick,
  onEditClick,
  isEditMode,
}) => {
  const router = useRouter()
  const [isGearVisible, setIsGearVisible] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      router.back()
    }
  }

  const handleSettingClick = () => {
    if (onSettingClick) {
      onSettingClick()
    } else {
      router.push("/user")
    }
  }

  const handleGearClick = () => {
    setIsGearVisible(false)
    setIsEditing(true)
    if (onEditClick) {
      onEditClick()
    }
  }

  if (variant === "simple") {
    return (
      <div className="mb-4 flex h-[94px] w-[333px] items-center justify-between bg-white px-6 py-6 pr-[30px]">
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="text-black transition-colors"
          >
            <span className="text-xl">←</span>
          </button>
        )}
        {title && (
          <span
            className={`text-lg font-medium ${
              titleColor === "primary"
                ? "text-[var(--color-primary)]"
                : titleColor === "black"
                  ? "text-black"
                  : "text-blue-600"
            }`}
          >
            {title}
          </span>
        )}
        <div className="relative flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-300"></div>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-[var(--color-primary)]">
              근육멋사
            </span>
            {!isEditing && isGearVisible && (
              <button onClick={handleGearClick} className="cursor-pointer">
                <Icon name="gear" size={20} color="primary" />
              </button>
            )}
          </div>
          {/* Gear 아이콘을 프로필 사진 원의 중앙에 배치하고 왼쪽으로 207px 간격 */}
          <button
            onClick={handleSettingClick}
            className="absolute cursor-pointer p-1"
            style={{
              right: "-207px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          ></button>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-4 flex h-[94px] w-[333px] items-center justify-between bg-white px-6 py-6 pr-[30px]">
      {showBackButton && (
        <button
          onClick={handleBackClick}
          className="text-black transition-colors"
        >
          <span className="text-xl">←</span>
        </button>
      )}
      {title && (
        <span
          className={`text-lg font-medium ${
            titleColor === "primary"
              ? "text-[var(--color-primary)]"
              : titleColor === "black"
                ? "text-black"
                : "text-blue-600"
          }`}
        >
          {title}
        </span>
      )}
      <div className="absolute flex items-center space-x-4">
        <div className="h-16 w-16 gap-26 rounded-full bg-gray-300"></div>
        <span className="text-2xl font-bold text-[var(--color-primary)]">
          근육멋사
        </span>
      </div>
      <span className="relative ml-[270px]">
        {!isEditing && isGearVisible && (
          <button
            onClick={handleGearClick}
            className="ml-[30px] cursor-pointer"
          >
            <Icon name="gear" size={20} color="primary" />
          </button>
        )}
      </span>
    </div>
  )
}

export default Header
