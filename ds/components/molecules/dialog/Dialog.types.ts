import { DialogVariants } from "@/ds/styles/tokens/dialog/variants"

type Button = {
  text: string
  onClick: () => void
}

export interface DialogProps {
  message: string
  variant: DialogVariants
  buttons?: Button[]
}
