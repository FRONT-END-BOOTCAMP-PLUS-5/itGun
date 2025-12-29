import { HTMLAttributes } from "react"

export enum Gender {
  NONE = "none",
  MALE = "male",
  FEMALE = "female",
}

export interface SignupData {
  step1: { email: string }
  step2: { password: string }
  step3: {
    nickname: string
    height?: string | undefined
    weight?: string | undefined
    gender?: Gender | undefined
    age?: string | undefined
  }
}

export interface SignupContextType {
  data: SignupData
  updateStep1: (data: SignupData["step1"]) => void
  updateStep2: (data: SignupData["step2"]) => void
}

export interface ValidatePassword {
  password: string
  passwordConfirm: string
}

export interface ValidationItemProps {
  isValid: boolean
  label: string
  showIcon?: boolean
  className?: HTMLAttributes<HTMLDivElement>["className"]
}
