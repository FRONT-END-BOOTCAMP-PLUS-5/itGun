import { BigThreeRecord } from "@/backend/domain/entities/BigThreeRecord"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface BigThreeRecordRepository {
  findMaxByUserId(userId: string, tx?: TransactionClient): Promise<BigThreeRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<BigThreeRecord[]>
  save(record: BigThreeRecord, tx?: TransactionClient): Promise<BigThreeRecord>
  deleteByUserIdAndDates(userId: string, earnedAt: Date, createdAt: Date, tx?: TransactionClient): Promise<boolean>
}
