type WorkoutSetData = {
  setCount: number
  durationSeconds?: number | string
  distance?: string
  weight?: number
  repetitionCount?: number
}

export type WorkoutItem = {
  id: number
  title: string
  type: "duration" | "distance-duration" | "weight-reps" | "reps"
  data: WorkoutSetData[]
}

export const workoutTypes: Record<string, string> = {
  STRENGTH: "weight-reps",
  PLYOMETRICS: "reps",
  CARDIO: "distance-duration",
  WEIGHTLIFTING: "duration",
}

export const calIconTypes = [
  {
    type: "cardio",
    icon: "hearts",
    label: "유산소",
    color: "error",
  },
  {
    type: "upper",
    icon: "arm",
    label: "상체",
    color: "success",
  },
  {
    type: "lower",
    icon: "leg",
    label: "하체",
    color: "secondary-blue",
  },
]
