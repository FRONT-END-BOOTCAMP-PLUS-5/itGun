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
  exercise_name: string;
  set_count: number;
  weight?: number;
  repetition_count?: number;
  distance?: number;
  duration_seconds?: number;
  exercise_info: ExerciseInfo;
}

export interface CreateLogRequestDto {
  user_id: string;
  cal_icon_type: CalIconType;
  total_duration: number;
  created_at?: Date;
  workouts: WorkoutData[];
}
