import { CalIconType } from "../../../../domain/entities/Log";

export interface ExerciseInfo {
  exerciseId: string;
  name: string;
  gifUrl: string;
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles: string[];
  instructions: string[];
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
