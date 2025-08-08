import { WorkoutDto } from "./GetWorkoutDto"

export interface LogDto {
  id: number
  calIconType: string
  createdAt: string
  totalDuration: number

  // Relations
  workouts: WorkoutDto[]
}
