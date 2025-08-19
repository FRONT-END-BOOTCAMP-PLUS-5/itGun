interface WorkoutVariantConfig {
  border: string
  background: string
  titleColor: string
}

export const workoutVariants: Record<string, WorkoutVariantConfig> = {
  primary: {
    border: "border-2 border-[var(--color-primary)]",
    background: "bg-[var(--color-white-100)]",
    titleColor: "text-[var(--color-primary)]",
  },
  secondary: {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-white-100)]",
    titleColor: "text-[var(--color-secondary)]",
  },
  "secondary-purple": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-secondary-purple)]",
    titleColor: "text-[var(--color-primary)]",
  },
  "secondary-pink": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-secondary-pink)]",
    titleColor: "text-[var(--color-primary)]",
  },
  "secondary-blue": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-secondary-blue)]",
    titleColor: "text-[var(--color-primary)]",
  },
  "secondary-yellow": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-secondary-yellow)]",
    titleColor: "text-[var(--color-primary)]",
  },
  "error": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-error)]",
    titleColor: "text-[var(--color-primary)]",
  },
  "accent": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-accent)]",
    titleColor: "text-[var(--color-primary)]",
  },
  "success": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-success)]",
    titleColor: "text-[var(--color-primary)]",
  },
  "info": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-info)]",
    titleColor: "text-[var(--color-primary)]",
  },
  "disable": {
    border: "border-2 border-[var(--color-secondary)]",
    background: "bg-[var(--color-disable)]",
    titleColor: "text-[var(--color-primary)]",
  },
}

export type WorkoutVariant = keyof typeof workoutVariants
