import prisma from "@/utils/prisma"
import { DeadliftRecord } from "@/backend/domain/entities/DeadliftRecord"
import { DeadliftRecordRepository } from "@/backend/domain/repositories/DeadliftRecordRepository"

export class PrDeadliftRecordRepository implements DeadliftRecordRepository {
  async findMaxByUserId(userId: string): Promise<DeadliftRecord | null> {
    const record = await prisma.deadliftRecord.findFirst({
      where: { userId },
      orderBy: { weight: "desc" }
    })
    return record as DeadliftRecord || null
  }

  async findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<DeadliftRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const records = await prisma.deadliftRecord.findMany({
      where: whereCondition,
      orderBy: { createdAt: sortOrder || "desc" },
      take: limit
    })

    return records as DeadliftRecord[]
  }

  async save(record: DeadliftRecord): Promise<DeadliftRecord> {
    const savedRecord = await prisma.deadliftRecord.create({
      data: {
        userId: record.userId,
        weight: record.weight,
        createdAt: record.createdAt
      }
    })
    return savedRecord as DeadliftRecord
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

}
