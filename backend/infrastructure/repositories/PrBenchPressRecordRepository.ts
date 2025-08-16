import prisma from "@/utils/prisma"
import { BenchPressRecord } from "@/backend/domain/entities/BenchPressRecord"
import { BenchPressRecordRepository } from "@/backend/domain/repositories/BenchPressRecordRepository"

export class PrBenchPressRecordRepository implements BenchPressRecordRepository {
  async findMaxByUserId(userId: string): Promise<BenchPressRecord | null> {
    const record = await prisma.benchPressRecord.findFirst({
      where: { userId },
      orderBy: { weight: "desc" }
    })
    return record as BenchPressRecord || null
  }

  async findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<BenchPressRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const records = await prisma.benchPressRecord.findMany({
      where: whereCondition,
      orderBy: { createdAt: sortOrder || "desc" },
      take: limit
    })

    return records as BenchPressRecord[]
  }

  async save(record: BenchPressRecord): Promise<BenchPressRecord> {
    const savedRecord = await prisma.benchPressRecord.create({
      data: {
        userId: record.userId,
        weight: record.weight,
        createdAt: record.createdAt
      }
    })
    return savedRecord as BenchPressRecord
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

}
