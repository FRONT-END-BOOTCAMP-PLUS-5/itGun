export type TooltipVariant = "primary" | "secondary-blue" | "error" | "success"
export type TooltipPosition = "top" | "bottom" | "left" | "right"
export type TooltipSize = "xs" | "sm" | "md" | "lg"

export interface TooltipProps {
  label: string
  variant?: TooltipVariant
  position?: TooltipPosition
  size?: TooltipSize
  className?: string
}
