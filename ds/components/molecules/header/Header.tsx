import React from "react"
import Image from "next/image"
import { HeaderProps } from "./Header.types"
import { Button } from "../../atoms/button/Button"
import Icon from "../../atoms/icon/Icon"

export const Header: React.FC<HeaderProps> = ({
  showBackButton = true,
  logoSrc,
  className,
  onBack,
}) => {
  return (
    <header
      className={`flex h-15 w-full items-center justify-between bg-[var(--color-white-200)] p-2.5 ${className}`}
    >
      {/* 왼쪽: 뒤로가기 */}
      <div className="flex items-center">
        {showBackButton && (
          <Button size="xs" variant="ghost" onClick={onBack}>
            <Icon name="leftArrow" size={30} fillColor="primary" />
          </Button>
        )}
      </div>

      {/* 가운데: 로고 (아직 정해지지 않아서 일단 가운데에 둠) */}
      <div className="absolute left-1/2 -translate-x-1/2 transform">
        {logoSrc && (
          <Image src={logoSrc} alt="logo" width={80} height={24} priority />
        )}
      </div>

      {/* 오른쪽: 여백 (정렬 유지용) */}
      <div className="w-1" />
    </header>
  )
}
