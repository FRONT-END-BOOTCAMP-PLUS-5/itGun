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

export interface PasswordCheckModalProps {
  setIsAuth: (flag: boolean) => void
}

export interface Password {
  password: string
  passwordConfirm: string
}

export interface PasswordInputProps {
  password: Password
  setPassword: (password: Password) => void
}
