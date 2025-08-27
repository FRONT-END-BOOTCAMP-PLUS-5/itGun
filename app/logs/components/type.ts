import { Dispatch, SetStateAction } from "react"
import { CalIconType, FormData } from "../types"

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
  setFormData: Dispatch<SetStateAction<FormData[]>>
}

export interface WorkoutLogSaveButtonProps {
  calIconType: CalIconType | null
  date: string
  totalDuration: number
  formData: FormData[]
}

export interface ExerciseListModalProps {
  setOpen: (open: boolean) => void
}
