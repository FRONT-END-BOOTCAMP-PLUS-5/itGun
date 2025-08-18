import { RunningRecord } from "@/backend/domain/entities/RunningRecord"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface RunningRecordRepository {
  findMaxByUserId(userId: string, tx?: TransactionClient): Promise<RunningRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<RunningRecord[]>
  save(record: RunningRecord, tx?: TransactionClient): Promise<RunningRecord>
  deleteByUserIdAndEarnedAt(userId: string, earnedAt: Date, tx?: TransactionClient): Promise<boolean>
}
