import React from "react"
import Image from "next/image"
import { HeaderProps } from "./Header.types"
import { Button } from "../../atoms/button/Button"
import Icon from "../../atoms/icon/Icon"

export const Header: React.FC<HeaderProps> = ({
  showBackButton = true,
  className,
  onBack,
}) => {
  return (
    <header
      className={`flex h-15 w-full items-center bg-[var(--color-white-200)] p-2.5 ${className}`}
    >
      {/* 왼쪽: 뒤로가기 */}
      <div className="flex items-center">
        {showBackButton && (
          <Button size="xs" variant="ghost" onClick={onBack}>
            <Icon name="leftArrow" size={30} fillColor="primary" />
          </Button>
        )}
      </div>
    </header>
  )
}
