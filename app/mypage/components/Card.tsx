import React from "react"
import { svgList } from "@/static/svgs/svgList"
import Icon from "@/ds/components/atoms/icon/Icon"

interface CardProps {
  variant?: "white" | "gray" | "transparent"
  className?: string
  children: React.ReactNode
  showSaveButton?: boolean
  onEditClick?: () => void
}

const Card: React.FC<CardProps> = ({
  variant = "white",
  className = "",
  children,
  showSaveButton = false,
  onEditClick,
}) => {
  const variantStyles = {
    white: "bg-white",
    gray: "bg-gray-50",
    transparent: "bg-transparent",
  }

  return (
    <div
      className={`relative mx-auto mt-8 w-full max-w-[430px] rounded-lg p-6 ${variantStyles[variant]} ${className}`}
    >
      {/* Gear 아이콘을 텍스트 오른쪽에 바로 붙여서 배치 */}
      {onEditClick && (
        <div className="mb-4 flex items-center justify-end">
          <button onClick={onEditClick} className="cursor-pointer p-1"></button>
        </div>
      )}

      {children}
      {showSaveButton && (
        <div className="mt-52 flex justify-center">
          <button
            onClick={() => console.log("저장")}
            className="flex h-20 w-[393px] items-center justify-between rounded-lg bg-[#3D2C4B] px-5 py-4 font-medium text-white transition-colors"
          >
            <span>저장</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Card
