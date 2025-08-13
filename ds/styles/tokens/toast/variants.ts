export const toastVariants = {
  primary: {
    bg: "bg-[var(--color-primary)]",
    text: "!text-[var(--color-white-100)]",
  },
  "secondary-puple": {
    bg: "bg-[var(--color-secondary-purple)]",
    text: "!text-[var(--color-white-100)]",
  },
  "secondary-pink": {
    bg: "bg-[var(--color-secondary-pink)]",
    text: "!text-[var(--color-white-100)]",
  },
  "secondary-blue": {
    bg: "bg-[var(--color-secondary-blue)]",
    text: "!text-[var(--color-white-100)]",
  },
  success: {
    bg: "bg-[var(--color-success)]",
    text: "!text-[var(--color-white-100)]",
  },
  error: {
    bg: "bg-[var(--color-error)]",
    text: "!text-[var(--color-white-100)]",
  },
  info: {
    bg: "bg-[var(--color-info)]",
    text: "!text-[var(--color-white-100)]",
  },
  disabled: {
    bg: "bg-[var(--color-disable)]",
    text: "!text-[var(--color-white-100)]",
  },
}

export type ToastVariant = keyof typeof toastVariants
