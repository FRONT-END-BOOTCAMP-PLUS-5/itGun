"use client"

import { useState } from "react"
import { downloadCurrentCharacter } from "@/utils/downloadCharacter"
import Icon from "@/ds/components/atoms/icon/Icon"
import { Button } from "@/ds/components/atoms/button/Button"
import { CharacterDownloadButtonProps } from "@/app/components/CharacterDownloadButton.type"

const CharacterDownloadButton: React.FC<CharacterDownloadButtonProps> = ({
  userNickName,
  className = "",
}) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      const fileName = userNickName
        ? `itgun-${userNickName}-${new Date().getTime()}`
        : ""
      downloadCurrentCharacter(fileName)
    } catch (error) {
      console.error("다운로드 중 오류가 발생했습니다:", error)
    } finally {
      setTimeout(() => {
        setIsDownloading(false)
      }, 1000)
    }
  }

  return (
    <div className={`${className}`}>
      <Button
        variant="ghost"
        size="xs"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        <Icon name="save" />
      </Button>
    </div>
  )
}

export default CharacterDownloadButton
