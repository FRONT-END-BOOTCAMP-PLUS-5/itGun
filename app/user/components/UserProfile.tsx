"use client"
import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { H2 } from "@/ds/components/atoms/text/TextWrapper"
import { colors } from "@/static/colors"
import { useSession } from "next-auth/react"
import { UserProfileProps } from "../types"

const UserProfile: React.FC<UserProfileProps> = ({ isEdit, setIsEdit }) => {
  const { data: session } = useSession()
  const handleSettingClick = () => {
    setIsEdit(true)
  }
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="xs">
          <div className="flex aspect-square w-[95px] items-center justify-center rounded-full bg-[var(--color-disable)]">
            <Icon
              name="burkyFace"
              size={60}
              fillColor={session?.user?.characterColor || colors[0]}
              color="primary"
            />
          </div>
        </Button>
        <H2>{session?.user?.nickName || `벌키`}</H2>
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
