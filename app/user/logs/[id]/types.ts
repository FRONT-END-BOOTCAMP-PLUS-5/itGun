import {
  WorkoutSetData,
  WorkoutType,
} from "@/ds/components/molecules/workout/Workout.types"

enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

type BodyPartsGroup =
  | "legs"
  | "back"
  | "chest"
  | "shoulders"
  | "arms"
  | "core"
  | "stamina"

export interface WorkoutItem {
  id: number
  seq: number
  exerciseName: string
  setCount: number
  weight?: number
  repetitionCount?: number
  distance?: number
  durationSeconds?: number
}

export interface Log {
  id: number
  userId: string
  calIconType: CalIconType
  logDate: Date
  totalDuration: number
  gaugeChanges: Record<BodyPartsGroup, number>
  workouts: WorkoutItem[]
}

export type WorkoutGroup = {
  seq: number
  exerciseName: string
  type: WorkoutType
  items: WorkoutSetData[]
}

export interface HeaderProps {
  id: string
  date: string
  duration: number
}

export interface WorkoutListProps {
  workouts: WorkoutItem[]
}

export interface LogDetailProps {
  id: string
}

export interface LogCharacterProps {
  date: string
}

export interface userLogProps {
  params: Promise<{ id: string }>
}
