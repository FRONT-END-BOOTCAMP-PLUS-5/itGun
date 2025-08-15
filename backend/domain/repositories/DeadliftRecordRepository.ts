import { DeadliftRecord } from "@/backend/domain/entities/DeadliftRecord"

export interface DeadliftRecordRepository {
  findByUserId(userId: string): Promise<DeadliftRecord | null>
  save(record: DeadliftRecord): Promise<DeadliftRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
