import prisma from "@/utils/prisma"
import { SquatRecord } from "@/backend/domain/entities/SquatRecord"
import { SquatRecordRepository } from "@/backend/domain/repositories/SquatRecordRepository"

export class PrSquatRecordRepository implements SquatRecordRepository {
  async findByUserId(userId: string): Promise<SquatRecord | null> {
    const record = await prisma.squatRecord.findUnique({
      where: { userId }
    })
    return record ? this.toDomain(record) : null
  }

  async save(record: SquatRecord): Promise<SquatRecord> {
    const savedRecord = await prisma.squatRecord.upsert({
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
      await prisma.squatRecord.deleteMany({
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

  private toDomain(record: any): SquatRecord {
    return new SquatRecord(
      record.id,
      record.userId,
      record.weight,
      record.createdAt
    )
  }
}
