export const textVariants = {
  primary: "text-[var(--color-primary)]",
  secondary: "text-[var(--color-secondary)]",
  "secondary-purple": "text-[var(--color-secondary-purple)]",
  "secondary-pink": "text-[var(--color-secondary-pink)]",
  "secondary-blue": "text-[var(--color-secondary-blue)]",
  "secondary-yellow": "text-[var(--color-secondary-yellow)]",
  "white-100": "text-[var(--color-white-100)]",
  "white-200": "text-[var(--color-white-200)]",
  disable: "text-[var(--color-disable)]",
  error: "text-[var(--color-error)]",
  accent: "text-[var(--color-accent)]",
  success: "text-[var(--color-success)]",
  info: "text-[var(--color-info)]",
} as const

export type TextVariant = keyof typeof textVariants
