import { ButtonSize } from "@/ds/styles/tokens/button/sizes"
import { ButtonVariant } from "@/ds/styles/tokens/button/variants"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  isFullWidth?: boolean
}
