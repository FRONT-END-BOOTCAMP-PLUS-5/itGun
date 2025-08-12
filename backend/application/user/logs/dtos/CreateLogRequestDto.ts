import { CalIconType } from "@/backend/domain/entities/Log";

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
  createdAt?: Date;
  workouts: WorkoutData[];
}
