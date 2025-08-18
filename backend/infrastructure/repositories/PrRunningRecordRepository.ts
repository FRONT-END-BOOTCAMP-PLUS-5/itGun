import prisma from "@/utils/prisma"
import { RunningRecord } from "@/backend/domain/entities/RunningRecord"
import { RunningRecordRepository } from "@/backend/domain/repositories/RunningRecordRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrRunningRecordRepository implements RunningRecordRepository {
  async findMaxByUserId(userId: string, tx?: TransactionClient): Promise<RunningRecord | null> {
    const client = tx || prisma
    const record = await client.runningRecord.findFirst({
      where: { userId },
      orderBy: { distance: "desc" }
    })
    return record as RunningRecord || null
  }

  async findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<RunningRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.earnedAt = {}
      if (startDate) whereCondition.earnedAt.gte = startDate
      if (endDate) whereCondition.earnedAt.lte = endDate
    }

    const client = tx || prisma
    const records = await client.runningRecord.findMany({
      where: whereCondition,
      orderBy: { earnedAt: sortOrder || "desc" },
      take: limit
    })

    return records as RunningRecord[]
  }

  async save(record: RunningRecord, tx?: TransactionClient): Promise<RunningRecord> {
    const client = tx || prisma
    const savedRecord = await client.runningRecord.create({
      data: {
        userId: record.userId,
        distance: record.distance,
        earnedAt: record.earnedAt
      }
    })
    return savedRecord as RunningRecord
  }

  async deleteByUserIdAndEarnedAt(userId: string, earnedAt: Date, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.runningRecord.deleteMany({
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
