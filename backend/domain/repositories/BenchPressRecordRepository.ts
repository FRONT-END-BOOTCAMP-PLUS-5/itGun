import { BenchPressRecord } from "@/backend/domain/entities/BenchPressRecord"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface BenchPressRecordRepository {
  findMaxByUserId(userId: string, tx?: TransactionClient): Promise<BenchPressRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<BenchPressRecord[]>
  save(record: BenchPressRecord, tx?: TransactionClient): Promise<BenchPressRecord>
  deleteByUserIdAndDates(userId: string, earnedAt: Date, createdAt: Date, tx?: TransactionClient): Promise<boolean>
}
