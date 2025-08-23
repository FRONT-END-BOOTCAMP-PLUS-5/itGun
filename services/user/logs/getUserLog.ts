import { api } from "@/utils/api/apiClient"

export enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

export type BodyPartsGroup =
  | "legs"
  | "back"
  | "chest"
  | "shoulders"
  | "arms"
  | "core"
  | "stamina"

export interface Workout {
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
  logDate: string
  totalDuration: number
  gaugeChanges: Record<BodyPartsGroup, number>
  workouts: Workout[]
}

export interface Response {
  success: boolean
  message: string
  log: Log
}

export const getUserLog = (id: string) => {
  return api.get<Response>(`/user/logs/${id}`)
}
