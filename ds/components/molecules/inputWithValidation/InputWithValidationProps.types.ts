import { InputProps } from "@/ds/components/atoms/input/Input.types"

export interface InputWithValidationProps extends InputProps {
  validations: Validation[]
}
export interface Validation {
  label: string
  isValid: boolean
}
