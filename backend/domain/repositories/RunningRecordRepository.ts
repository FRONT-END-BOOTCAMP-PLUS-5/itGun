import { RunningRecord } from "@/backend/domain/entities/RunningRecord"

export interface RunningRecordRepository {
  findByUserId(userId: string): Promise<RunningRecord | null>
  save(record: RunningRecord): Promise<RunningRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
