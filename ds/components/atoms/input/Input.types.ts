import { InputSize } from "@/ds/styles/tokens/input/sizes"

type ValidationRule = {
  label: string // "2글자 이상", "숫자 포함" 등 UI 표시용
  validate: (value: string) => boolean // 조건 검사 함수
}

type ErrorRule = {
  when: (value: string) => boolean // 에러 조건
  message: string // 에러 메시지
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: React.HTMLInputTypeAttribute // 'text' | 'email' | 'password' | ...
  size?: InputSize
  isFullWidth?: boolean
  placeholder?: string
  validations?: ValidationRule[]
  errorRules?: ErrorRule[]
}
