import { LogWorkout } from "../entities/LogWorkout";

export interface LogWorkoutRepository {
  findAll(): Promise<LogWorkout[]>;
  findById(id: number): Promise<LogWorkout | null>;
  save(logWorkout: LogWorkout): Promise<LogWorkout>;
  update(id: number, logWorkout: Partial<LogWorkout>): Promise<LogWorkout | null>;
  delete(id: number): Promise<boolean>;
}
