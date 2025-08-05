import { Workout } from "../entities/Workout";

export interface WorkoutRepository {
  findAll(): Promise<Workout[]>;
  findById(id: number): Promise<Workout | null>;
  save(workout: Workout): Promise<Workout>;
  update(id: number, workout: Partial<Workout>): Promise<Workout | null>;
  delete(id: number): Promise<boolean>;
}
