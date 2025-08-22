interface WorkoutFieldsConfig {
  columns: string[]
  fields: string[]
  placeholders: string[]
}

export const workoutFields: Record<string, WorkoutFieldsConfig> = {
  "weight-reps": {
    columns: ["세트", "kg", "회"],
    fields: ["setCount", "weight", "repetitionCount"] as const,
    placeholders: ["", "무게", "횟수"],
  },
  "reps": {
    columns: ["세트", "회"],
    fields: ["setCount", "repetitionCount"] as const,
    placeholders: ["", "횟수"],
  },
  "distance-duration": {
    columns: ["세트", "km", "시간"],
    fields: ["setCount", "distance", "durationSeconds"] as const,
    placeholders: ["", "거리", ""],
  },
  "duration": {
    columns: ["세트", "시간"],
    fields: ["setCount", "durationSeconds"] as const,
    placeholders: ["", ""],
  },
} as const

export type WorkoutField = keyof typeof workoutFields
