import { HTMLAttributes } from "react"

export interface ValidationCheckProps {
  isValid: boolean
  label: string
  showIcon?: boolean
  className?: HTMLAttributes<HTMLDivElement>["className"]
}
