"use client"
import React from "react"
import Image from "next/image"
import { HeaderProps } from "./Header.types"
import { Button } from "../../atoms/button/Button"
import Icon from "../../atoms/icon/Icon"
import { useRouter } from "next/navigation"

export const Header: React.FC<HeaderProps> = ({
  showBackButton = true,
  className,
  onBack,
}) => {
  const router = useRouter()
  const onClickBack = () => {
    if (onBack) onBack()

    router.back()
  }
  return (
    <header
      className={`flex h-15 max-w-[inherit] w-full items-center bg-[var(--color-white-200)] p-2.5 ${className}`}
    >
      {/* 왼쪽: 뒤로가기 */}
      <div className="flex items-center">
        {showBackButton && (
          <Button size="xs" variant="ghost" onClick={onClickBack}>
            <Icon name="leftArrow" size={30} fillColor="primary" />
          </Button>
        )}
      </div>
    </header>
  )
}
