export const buttonVariants = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-white-200)] cursor-pointer",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-white-200)] cursor-pointer",
  "secondary-purple":
    "bg-[var(--color-secondary-purple)] text-[var(--color-white-200)] cursor-pointer",
  "secondary-pink":
    "bg-[var(--color-secondary-pink)] text-[var(--color-white-200)] cursor-pointer",
  "secondary-blue":
    "bg-[var(--color-secondary-blue)] text-[var(--color-white-200)] cursor-pointer",
  "secondary-yellow":
    "bg-[var(--color-secondary-yellow)] text-[var(--color-primary)] cursor-pointer",
  "white-200":
    "bg--[var(--color-white-200)] text-[var(--color-primary)] cursor-pointer",
  outline:
    "border border-2 border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer",
  underline:
    "border-b-1 bg-transparent border-[var(--color-secondary)] text-[var(--color-secondary)] cursor-pointer",
  "underline-disable":
    "border-b-1 bg-transparent border-[var(--color-disable)] text-[var(--color-disable)] cursor-pointer",
  ghost: "bg-transparent border-0 text-[var(--color-primary)] cursor-pointer",
  disable:
    "bg-[var(--color-disable)] text-[var(--color-white-200)] cursor-not-allowed",
} as const

export type ButtonVariant = keyof typeof buttonVariants
