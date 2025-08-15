import prisma from "@/utils/prisma"
import { DeadliftRecord } from "@/backend/domain/entities/DeadliftRecord"
import { DeadliftRecordRepository } from "@/backend/domain/repositories/DeadliftRecordRepository"

export class PrDeadliftRecordRepository implements DeadliftRecordRepository {
  async findByUserId(userId: string): Promise<DeadliftRecord | null> {
    const record = await prisma.deadliftRecord.findUnique({
      where: { userId }
    })
    return record ? this.toDomain(record) : null
  }

  async save(record: DeadliftRecord): Promise<DeadliftRecord> {
    const savedRecord = await prisma.deadliftRecord.upsert({
      where: { userId: record.userId },
      update: { weight: record.weight },
      create: {
        userId: record.userId,
        weight: record.weight,
        createdAt: record.createdAt
      }
    })
    return this.toDomain(savedRecord)
  }

  async deleteByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<boolean> {
    try {
      await prisma.deadliftRecord.deleteMany({
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

  private toDomain(record: any): DeadliftRecord {
    return new DeadliftRecord(
      record.id,
      record.userId,
      record.weight,
      record.createdAt
    )
  }
}
