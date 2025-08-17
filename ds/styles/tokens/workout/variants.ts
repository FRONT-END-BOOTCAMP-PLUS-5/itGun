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
}

export type WorkoutVariant = keyof typeof workoutVariants
