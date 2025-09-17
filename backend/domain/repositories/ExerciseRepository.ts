import { TransactionClient } from "../common/TransactionClient"
import { Exercise } from "../entities/Exercise"

export interface ExerciseRepository {
  find(options: {
    page: number
    limit: number
    keywords?: string[]
    bodyParts?: string[]
    equipments?: string[]
  }): Promise<{ exercises: Exercise[]; total: number } | null>
  findById(id: string, tx?: TransactionClient): Promise<Exercise | null>
}
