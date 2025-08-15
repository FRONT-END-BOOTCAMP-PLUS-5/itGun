import prisma from "@/utils/prisma"
import { BigThreeRecord } from "@/backend/domain/entities/BigThreeRecord"
import { BigThreeRecordRepository } from "@/backend/domain/repositories/BigThreeRecordRepository"

export class PrBigThreeRecordRepository implements BigThreeRecordRepository {
  async findByUserId(userId: string): Promise<BigThreeRecord | null> {
    const record = await prisma.bigThreeRecord.findUnique({
      where: { userId }
    })
    return record ? this.toDomain(record) : null
  }

  async save(record: BigThreeRecord): Promise<BigThreeRecord> {
    const savedRecord = await prisma.bigThreeRecord.upsert({
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
      await prisma.bigThreeRecord.deleteMany({
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

  private toDomain(record: any): BigThreeRecord {
    return new BigThreeRecord(
      record.id,
      record.userId,
      record.weight,
      record.createdAt
    )
  }
}
