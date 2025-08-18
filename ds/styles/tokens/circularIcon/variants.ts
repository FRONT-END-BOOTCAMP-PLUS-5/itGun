export const circularIconVariants = {
  primary: "bg-[var(--color-primary)]",
  secondary: "bg-[var(--color-secondary)]",
  "secondary-purple":
    "bg-[var(--color-secondary-purple)]",
  "secondary-pink":
    "bg-[var(--color-secondary-pink)]",
  "secondary-blue":
    "bg-[var(--color-secondary-blue)]",
  "secondary-yellow":
    "bg-[var(--color-secondary-yellow)]",
  outline: "bg-[var(--color-white-100)]",
  error: "bg-[var(--color-error)]",
  accent: "bg-[var(--color-accent)]",
  success: "bg-[var(--color-success)]",
  info: "bg-[var(--color-info)]",
  disable: "bg-[var(--color-disable)] cursor-not-allowed",
} as const

export type CircularIconVariant = keyof typeof circularIconVariants
