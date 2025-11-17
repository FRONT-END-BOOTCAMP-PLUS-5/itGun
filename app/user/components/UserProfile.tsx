"use client"
import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { H2 } from "@/ds/components/atoms/text/TextWrapper"
import { useSession } from "next-auth/react"
import { UserProfileProps } from "../types"
import { HexColorPicker } from "react-colorful"
import { useState, useRef, useEffect } from "react"

const UserProfile: React.FC<UserProfileProps> = ({
  isEdit,
  setIsEdit,
  color,
  setColor,
}) => {
  const { data: session } = useSession()
  const [isOpenColorPicker, setIsOpenColorPicker] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const handleSettingClick = () => {
    setIsEdit(true)
  }

  const handleProfileClick = () => {
    if (!isEdit) return
    setIsOpenColorPicker((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsOpenColorPicker(false)
      }
    }

    if (isOpenColorPicker) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpenColorPicker])

  return (
    <div className="flex w-full justify-between py-1">
      <div className="relative flex items-center gap-2">
        {isOpenColorPicker && (
          <div ref={colorPickerRef} className="absolute top-20 left-10 z-10">
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        )}
        <Button
          variant="ghost"
          size="xs"
          onClick={handleProfileClick}
          className={`${isEdit ? "cursor-pointer" : "!cursor-default"} !px-0 !py-0`}
        >
          <div className="flex aspect-square w-[95px] items-center justify-center rounded-full bg-[var(--color-disable)]">
            <Icon
              name="burkyFace"
              size={60}
              fillColor={color}
              color="primary"
            />
          </div>
        </Button>
        <H2 className="cursor-default">{session?.user?.nickName || `벌키`}</H2>
      </div>
      {!isEdit && (
        <Button variant="ghost" size="xs" onClick={handleSettingClick}>
          <Icon name="setting" size={35} />
        </Button>
      )}
    </div>
  )
}

export default UserProfile
