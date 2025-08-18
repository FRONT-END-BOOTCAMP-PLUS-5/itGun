import { SquatRecord } from "@/backend/domain/entities/SquatRecord"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface SquatRecordRepository {
  findMaxByUserId(userId: string, tx?: TransactionClient): Promise<SquatRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<SquatRecord[]>
  save(record: SquatRecord, tx?: TransactionClient): Promise<SquatRecord>
  deleteByUserIdAndEarnedAt(userId: string, earnedAt: Date, tx?: TransactionClient): Promise<boolean>
}
