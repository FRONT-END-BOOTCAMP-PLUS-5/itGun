import { ButtonVariant } from "../button/variants"
import { TextVariant } from "../text/variants"

interface DialogVariantConfig {
  bg: string
  text: string
  buttons: ButtonVariant
}

export const dialogVariants: Record<string, DialogVariantConfig> = {
  primary: {
    bg: "bg-[var(--color-primary)]",
    text: "!text-[var(--color-white-100)]",
    buttons: "white-200",
  },
  secondary: {
    bg: "bg-[var(--color-secondary)]",
    text: "!text-[var(--color-white-100)]",
    buttons: "white-200",
  },
  error: {
    bg: "bg-[var(--color-error)] border-2 border-[var(--color-primary)]",
    text: "!text-[var(--color-primary)]",
    buttons: "outline",
  },
}

export type DialogVariants = keyof typeof dialogVariants
