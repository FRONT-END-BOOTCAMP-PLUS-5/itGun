import { InputSize } from "@/ds/styles/tokens/input/sizes"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: React.HTMLInputTypeAttribute // 'text' | 'email' | 'password' | ...
  size?: InputSize
  isFullWidth?: boolean
  placeholder?: string
}
