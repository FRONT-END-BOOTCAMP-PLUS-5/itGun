import { BigThreeRecord } from "@/backend/domain/entities/BigThreeRecord"

export interface BigThreeRecordRepository {
  findMaxByUserId(userId: string): Promise<BigThreeRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<BigThreeRecord[]>
  save(record: BigThreeRecord): Promise<BigThreeRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
