import { ToastVariant } from "@/ds/styles/tokens/toast/variants"

export type ToastPosition = "top" | "bottom"

export interface ToastProps {
  message: string
  variant: ToastVariant
  position?: ToastPosition
  duration?: number
  onDismiss: () => void
}
