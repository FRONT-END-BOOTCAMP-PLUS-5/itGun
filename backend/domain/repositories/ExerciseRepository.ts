import { TransactionClient } from "@/backend/domain/common/TransactionClient"
import { Exercise } from "@/backend/domain/entities/Exercise"

export interface ExerciseRepository {
  find(options: {
    page: number
    limit: number
    keywords?: string[]
    bodyParts?: string[]
    equipments?: string[]
    tx?: TransactionClient
  }): Promise<{ exercises: Exercise[]; total: number } | null>
  findById(id: string, tx?: TransactionClient): Promise<Exercise | null>
}
