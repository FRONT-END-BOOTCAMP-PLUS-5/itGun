import { Workout } from "@/backend/domain/entities/Workout"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface WorkoutRepository {
  findAll(tx?: TransactionClient): Promise<Workout[]>
  findById(id: number, tx?: TransactionClient): Promise<Workout | null>
  save(workout: Workout, tx?: TransactionClient): Promise<Workout>
  saveMany(workouts: Omit<Workout, "id">[], tx?: TransactionClient): Promise<Workout[]>
  update(id: number, workout: Partial<Workout>, tx?: TransactionClient): Promise<Workout | null>
  delete(id: number, tx?: TransactionClient): Promise<boolean>
  findByMultipleCriteria(criteriaList: Partial<Workout>[], tx?: TransactionClient): Promise<Workout[]>
}
