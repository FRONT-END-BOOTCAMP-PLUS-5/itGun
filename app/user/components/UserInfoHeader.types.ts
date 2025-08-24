import type { GetUserInfoResponse } from "@/services/user/info/getUserInfo"

export interface UserInfoHeaderProps {
  onEditClick: () => void
  showSettingIcon?: boolean
  userInfo?: GetUserInfoResponse
  isLoading: boolean
}
