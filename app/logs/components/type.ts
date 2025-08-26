import { Dispatch, SetStateAction } from "react"
import { CalIconType, WorkoutData, FormData } from "../types"

export interface DateTypeProps {
  date: string
  setDate: Dispatch<SetStateAction<string>>
  totalDuration: number
  setTotalDuration: Dispatch<SetStateAction<number>>
}
export interface WorkoutTypeSelectorProps {
  calIconType: CalIconType | null
  setCalIconType: Dispatch<SetStateAction<CalIconType | null>>
}

export interface AddWorkoutFormProps {
  formData: FormData[]
  workoutData: WorkoutData[]
  setFormData: Dispatch<SetStateAction<FormData[]>>
  setWorkoutData: Dispatch<SetStateAction<WorkoutData[]>>
}

export interface WorkoutLogSaveButtonProps {
  calIconType: CalIconType | null
  date: string
  totalDuration: number
  formData: FormData[]
  workoutData: WorkoutData[]
}

export interface ExerciseListModalProps {
  setOpen: (open: boolean) => void
}
