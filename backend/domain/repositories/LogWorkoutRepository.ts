import { LogWorkout } from "../entities/LogWorkout";
import { TransactionClient } from "@/backend/domain/common/TransactionClient";

export interface LogWorkoutRepository {
  findAll(tx?: TransactionClient): Promise<LogWorkout[]>;
  findById(id: number, tx?: TransactionClient): Promise<LogWorkout | null>;
  save(logWorkout: LogWorkout, tx?: TransactionClient): Promise<LogWorkout>;
  saveMany(logWorkouts: Omit<LogWorkout, "id">[], tx?: TransactionClient): Promise<{ count: number }>;
  update(id: number, logWorkout: Partial<LogWorkout>, tx?: TransactionClient): Promise<LogWorkout | null>;
  delete(id: number, tx?: TransactionClient): Promise<boolean>;
}
