import { api } from "@/utils/api/apiClient"

export enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

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

export interface WorkoutData {
  seq: number
  exerciseName: string
  setCount: number
  weight?: number
  repetitionCount?: number
  distance?: number
  durationSeconds?: number
  exerciseInfo: ExerciseInfo
}

export interface CreateLogRequest {
  userId: string
  calIconType: CalIconType
  totalDuration: number
  logDate?: Date
  workouts: WorkoutData[]
}

export interface AwardedBadge {
  badgeId: number
  badgeName: string
  badgeDescription?: string
  earnedAt: Date
}

export interface CreateLogResponse {
  message: string
  logId?: number
  awardedBadges?: AwardedBadge[]
}

export const createUserLogs = (data: CreateLogRequest) =>
  api.post<CreateLogResponse>("/user/logs", data)
