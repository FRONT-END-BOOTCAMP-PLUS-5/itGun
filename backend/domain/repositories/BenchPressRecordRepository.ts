import { BenchPressRecord } from "@/backend/domain/entities/BenchPressRecord"

export interface BenchPressRecordRepository {
  findMaxByUserId(userId: string): Promise<BenchPressRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<BenchPressRecord[]>
  save(record: BenchPressRecord): Promise<BenchPressRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
