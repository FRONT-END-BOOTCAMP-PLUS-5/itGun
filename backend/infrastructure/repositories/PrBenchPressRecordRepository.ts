import prisma from "@/utils/prisma"
import { BenchPressRecord } from "@/backend/domain/entities/BenchPressRecord"
import { BenchPressRecordRepository } from "@/backend/domain/repositories/BenchPressRecordRepository"

export class PrBenchPressRecordRepository implements BenchPressRecordRepository {
  async findByUserId(userId: string): Promise<BenchPressRecord | null> {
    const record = await prisma.benchPressRecord.findUnique({
      where: { userId }
    })
    return record ? this.toDomain(record) : null
  }

  async save(record: BenchPressRecord): Promise<BenchPressRecord> {
    const savedRecord = await prisma.benchPressRecord.upsert({
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
      await prisma.benchPressRecord.deleteMany({
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

  private toDomain(record: any): BenchPressRecord {
    return new BenchPressRecord(
      record.id,
      record.userId,
      record.weight,
      record.createdAt
    )
  }
}
