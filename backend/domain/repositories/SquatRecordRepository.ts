import { SquatRecord } from "@/backend/domain/entities/SquatRecord"

export interface SquatRecordRepository {
  findByUserId(userId: string): Promise<SquatRecord | null>
  save(record: SquatRecord): Promise<SquatRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
