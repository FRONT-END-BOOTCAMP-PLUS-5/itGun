import { DeadliftRecord } from "@/backend/domain/entities/DeadliftRecord"

export interface DeadliftRecordRepository {
  findMaxByUserId(userId: string): Promise<DeadliftRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<DeadliftRecord[]>
  save(record: DeadliftRecord): Promise<DeadliftRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
