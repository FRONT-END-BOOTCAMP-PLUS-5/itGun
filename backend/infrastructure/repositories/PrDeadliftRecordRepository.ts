import prisma from "@/utils/prisma"
import { DeadliftRecord } from "@/backend/domain/entities/DeadliftRecord"
import { DeadliftRecordRepository } from "@/backend/domain/repositories/DeadliftRecordRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrDeadliftRecordRepository implements DeadliftRecordRepository {
  async findMaxByUserId(userId: string, tx?: TransactionClient): Promise<DeadliftRecord | null> {
    const client = tx || prisma
    const record = await client.deadliftRecord.findFirst({
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
    limit?: number,
    tx?: TransactionClient
  ): Promise<DeadliftRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.earnedAt = {}
      if (startDate) whereCondition.earnedAt.gte = startDate
      if (endDate) whereCondition.earnedAt.lte = endDate
    }

    const client = tx || prisma
    const records = await client.deadliftRecord.findMany({
      where: whereCondition,
      orderBy: { earnedAt: sortOrder || "desc" },
      take: limit
    })

    return records as DeadliftRecord[]
  }

  async save(record: DeadliftRecord, tx?: TransactionClient): Promise<DeadliftRecord> {
    const client = tx || prisma
    const savedRecord = await client.deadliftRecord.create({
      data: {
        userId: record.userId,
        weight: record.weight,
        earnedAt: record.earnedAt
      }
    })
    return savedRecord as DeadliftRecord
  }

  async deleteByUserIdAndEarnedAt(userId: string, earnedAt: Date, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.deadliftRecord.deleteMany({
        where: {
          userId,
          earnedAt
        }
      })
      return true
    } catch (error) {
      return false
    }
  }

}
