import { DeadliftRecord } from "@/backend/domain/entities/DeadliftRecord"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface DeadliftRecordRepository {
  findMaxByUserId(userId: string, tx?: TransactionClient): Promise<DeadliftRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<DeadliftRecord[]>
  save(record: DeadliftRecord, tx?: TransactionClient): Promise<DeadliftRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date, tx?: TransactionClient): Promise<boolean>
}
