import { Dispatch, SetStateAction } from "react"

export enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

//workout 컴포넌트에서 타입 선택 시 사용되는 타입
export const workoutTypes: Record<string, string> = {
  STRENGTH: "weight-reps",
  PLYOMETRICS: "duration",
  CARDIO: "distance-duration",
  WEIGHTLIFTING: "weight-reps",
}

//workout 컴포넌트에 사용되는 타입
export type FormSetData = {
  setCount: number
  durationSeconds?: number | string
  distance?: string
  weight?: number
  repetitionCount?: number
}

export type FormData = {
  title: string
  type: "duration" | "distance-duration" | "weight-reps" | "reps"
  data: FormSetData[]
  exerciseInfo: ExerciseInfo
}

//api 요청 시 사용되는 타입
export interface ExerciseInfo {
  exerciseId: string
  name: string
  imageUrl: string
  videoUrl: string
  bodyParts: string[]
  equipments: string[]
  exerciseType: string
  instructions: string[]
  exerciseTips: string[]
}
export type WorkoutData = {
  seq: number
  exerciseName: string
  setCount: number
  weight?: number
  repetitionCount?: number
  distance?: number
  durationSeconds?: number
  exerciseInfo: ExerciseInfo
}

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

export interface WorkoutLogSaveButtonProps {
  calIconType: CalIconType | null
  date: string
  totalDuration: number
}

export interface DatePickerProps {
  date: string
  setDate: (date: string) => void
}
