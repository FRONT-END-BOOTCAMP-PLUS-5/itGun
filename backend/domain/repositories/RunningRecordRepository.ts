import { RunningRecord } from "@/backend/domain/entities/RunningRecord"

export interface RunningRecordRepository {
  findMaxByUserId(userId: string): Promise<RunningRecord | null>
  findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<RunningRecord[]>
  save(record: RunningRecord): Promise<RunningRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
