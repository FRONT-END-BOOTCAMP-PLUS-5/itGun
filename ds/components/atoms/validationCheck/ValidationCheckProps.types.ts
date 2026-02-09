import { HTMLAttributes } from "react"

export type ValidationCheckVariant = "success" | "error" | "disable"

export interface ValidationCheckProps {
  label?: string
  variant: ValidationCheckVariant
  showIcon?: boolean
  className?: HTMLAttributes<HTMLDivElement>["className"]
}
