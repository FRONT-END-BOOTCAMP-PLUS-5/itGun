import { BigThreeRecord } from "@/backend/domain/entities/BigThreeRecord"

export interface BigThreeRecordRepository {
  findByUserId(userId: string): Promise<BigThreeRecord | null>
  save(record: BigThreeRecord): Promise<BigThreeRecord>
  deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean>
}
