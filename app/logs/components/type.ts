import { Dispatch, SetStateAction } from "react"
import { CalIconType, WorkoutData, WorkoutItem } from "../types"

export interface WorkoutTypeSelectorProps {
  calIconType: CalIconType | null
  setCalIconType: Dispatch<SetStateAction<CalIconType | null>>
}

export interface AddWorkoutFormProps {
  formData: WorkoutItem[]
  workoutData: WorkoutData[]
  setFormData: Dispatch<SetStateAction<WorkoutItem[]>>
  setWorkoutData: Dispatch<SetStateAction<WorkoutData[]>>
}

export interface WorkoutLogSaveButtonProps {
  calIconType: CalIconType | null
  date: string
  totalDuration: number
  formData: WorkoutItem[]
  workoutData: WorkoutData[]
}
