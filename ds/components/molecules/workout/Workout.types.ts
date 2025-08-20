import { WorkoutWidth } from "@/ds/styles/tokens/workout/width"
import { WorkoutVariant } from "@/ds/styles/tokens/workout/variants"

export type WorkoutType = "weight-reps" | "reps" | "distance-duration" | "duration"

export interface WorkoutSetData {
  setCount: number
  weight?: number | string
  repetitionCount?: number | string
  distance?: number | string
  durationSeconds?: number | string
}

export type WorkoutSetDataField = keyof WorkoutSetData

export interface WorkoutProps {
  seq?: number
  variant?: WorkoutVariant
  width?: WorkoutWidth
  isFullWidth?: boolean
  title: string
  type: WorkoutType
  data: WorkoutSetData[]
  isEditable?: boolean
  onAddSet?: (seq?: number) => void
  onRemoveSet?: (setIndex: number, seq?: number) => void
  onDataChange?: (setIndex: number, field: string, value: string | number, seq?: number) => void
  onTypeChange?: (newType: WorkoutType, seq?: number) => void
  className?: string
}
