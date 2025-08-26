"use client"

import { useState } from "react"
import { downloadCurrentCharacter } from "@/utils/downloadCharacter"
import Icon from "@/ds/components/atoms/icon/Icon"
import { Button } from "@/ds/components/atoms/button/Button"
import { CharacterDownloadButtonProps } from "@/app/components/CharacterDownloadButton.type"
import { useToastStore } from "@/hooks/useToastStore"

const CharacterDownloadButton: React.FC<CharacterDownloadButtonProps> = ({
  userNickName,
  className = "",
}) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const { showToast } = useToastStore()
  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      const fileName = userNickName
        ? `itgun-${userNickName}-${new Date().getTime()}`
        : ""
      downloadCurrentCharacter(fileName)

      showToast({
        message: "캐릭터 이미지가 \n다운로드되었습니다!😎",
        variant: "success",
        position: "top",
        duration: 3000,
      })
    } catch (error) {
      showToast({
        message:
          error instanceof Error
            ? error.message
            : "다운로드 중 오류가 발생했습니다😥",
        variant: "error",
        position: "top",
      })
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
        <Icon name="save" size={30} />
      </Button>
    </div>
  )
}

export default CharacterDownloadButton
