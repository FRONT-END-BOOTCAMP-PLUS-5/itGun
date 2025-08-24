import { WorkoutDto } from "@/backend/application/user/logs/dtos/GetWorkoutDto"

export enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

export type BodyPartsGroup = "legs" | "back" | "chest" | "shoulders" | "arms" | "core" | "stamina"

export interface LogDto {
  id: number
  userId: string
  calIconType: CalIconType
  logDate: Date
  totalDuration: number
  gaugeChanges: Record<BodyPartsGroup, number>

  // Relations
  workouts?: WorkoutDto[]
}
