import { SquatRecord } from "@/backend/domain/entities/SquatRecord"

export interface SquatRecordRepository {
  findMaxByUserId(userId: string): Promise<SquatRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<SquatRecord[]>
  save(record: SquatRecord): Promise<SquatRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
