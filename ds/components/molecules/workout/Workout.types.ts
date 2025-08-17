import { WorkoutWidth } from "@/ds/styles/tokens/workout/sizes"
import { WorkoutVariant } from "@/ds/styles/tokens/workout/variants"

export interface WorkoutProps {
  variant?: WorkoutVariant
  width?: WorkoutWidth
  isFullWidth?: boolean
  title: string
  children: React.ReactNode
  className?: string
}
