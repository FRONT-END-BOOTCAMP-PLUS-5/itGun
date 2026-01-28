import { InputProps } from "../../atoms/input/Input.types"
export interface InputWithValidationProps extends InputProps {
  validations: Validation[]
}
export interface Validation {
  label: string
  isValid: boolean
}
