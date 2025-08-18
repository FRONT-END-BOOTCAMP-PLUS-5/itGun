import prisma from "@/utils/prisma"
import { RunningRecord } from "@/backend/domain/entities/RunningRecord"
import { RunningRecordRepository } from "@/backend/domain/repositories/RunningRecordRepository"

export class PrRunningRecordRepository implements RunningRecordRepository {
  async findByUserId(userId: string): Promise<RunningRecord | null> {
    const record = await prisma.runningRecord.findUnique({
      where: { userId }
    })
    return record ? this.toDomain(record) : null
  }

  async save(record: RunningRecord): Promise<RunningRecord> {
    const savedRecord = await prisma.runningRecord.upsert({
      where: { userId: record.userId },
      update: { distance: record.distance },
      create: {
        userId: record.userId,
        distance: record.distance,
        createdAt: record.createdAt
      }
    })
    return this.toDomain(savedRecord)
  }

  async deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean> {
    try {
      await prisma.runningRecord.deleteMany({
        where: {
          userId,
          createdAt
        }
      })
      return true
    } catch (error) {
      return false
    }
  }

  private toDomain(record: any): RunningRecord {
    return new RunningRecord(
      record.id,
      record.userId,
      record.distance,
      record.createdAt
    )
  }
}
