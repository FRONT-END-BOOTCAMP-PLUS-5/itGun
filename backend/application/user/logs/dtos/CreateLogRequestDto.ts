enum CalIconType {
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
  seq: number;
  exerciseName: string;
  setCount: number;
  weight?: number;
  repetitionCount?: number;
  distance?: number;
  durationSeconds?: number;
  exerciseInfo: ExerciseInfo;
}

export interface CreateLogRequestDto {
  userId: string;
  calIconType: CalIconType;
  totalDuration: number;
  logDate?: Date;
  workouts: WorkoutData[];
}
