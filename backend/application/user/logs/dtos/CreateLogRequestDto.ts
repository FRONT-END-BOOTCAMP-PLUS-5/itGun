import { ExerciseApiData } from "@/backend/application/exercises/dtos/ExerciseApiResponse";
import { CalIconType } from "../../../../domain/entities/Log";

export interface WorkoutData {
  seq: number;
  exerciseName: string;
  setCount: number;
  weight?: number;
  repetitionCount?: number;
  distance?: number;
  durationSeconds?: number;
  exerciseInfo: ExerciseApiData;
}

export interface CreateLogRequestDto {
  userId: string;
  calIconType: CalIconType;
  totalDuration: number;
  createdAt?: Date;
  workouts: WorkoutData[];
}
