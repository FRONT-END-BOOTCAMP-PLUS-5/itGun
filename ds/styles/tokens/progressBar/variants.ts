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
  "secondary-purple": {
    bg: "bg-[var(--color-secondary-purple)]",
    border: "border-[var(--color-secondary-purple)]",
  },
  "secondary-pink": {
    bg: "bg-[var(--color-secondary-pink)]",
    border: "border-[var(--color-secondary-pink)]",
  },
  "secondary-blue": {
    bg: "bg-[var(--color-secondary-blue)]",
    border: "border-[var(--color-secondary-blue)]",
  },
  accent: {
    bg: "bg-[var(--color-accent)]",
    border: "border-[var(--color-accent)]",
  },
  success: {
    bg: "bg-[var(--color-success)]",
    border: "border-[var(--color-success)]",
  },
  info: {
    bg: "bg-[var(--color-info)]",
    border: "border-[var(--color-info)]",
  },
}
export type ProgressBarVariantKey = keyof typeof progressBarVariants
