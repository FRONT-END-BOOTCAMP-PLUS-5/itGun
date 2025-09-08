export interface UserInfoProps {
  isEdit: boolean
  setIsEdit: (flag: boolean) => void
  color: string
}

export interface UserProfileProps {
  isEdit: boolean
  setIsEdit: (flag: boolean) => void
  setColor: (color: string) => void
  color: string
}
