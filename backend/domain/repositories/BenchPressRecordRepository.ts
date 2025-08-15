import { BenchPressRecord } from "@/backend/domain/entities/BenchPressRecord"

export interface BenchPressRecordRepository {
  findByUserId(userId: string): Promise<BenchPressRecord | null>
  save(record: BenchPressRecord): Promise<BenchPressRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
