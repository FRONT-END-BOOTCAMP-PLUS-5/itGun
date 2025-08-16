export type ProgressBarVariantToken = {
  bg: string
  border: string
}

export const progressBarVariants: Record<string, ProgressBarVariantToken> = {
  primary: {
    bg: "bg-[var(--color-primary)]",
    border: "border-[var(--color-primary)]",
  },
  secondary: {
    bg: "bg-[var(--color-secondary)]",
    border: "border-[var(--color-secondary)]",
  },
}
