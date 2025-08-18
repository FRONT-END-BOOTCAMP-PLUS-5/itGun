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
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const client = tx || prisma
    const records = await client.runningRecord.findMany({
      where: whereCondition,
      orderBy: { createdAt: sortOrder || "desc" },
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
        createdAt: record.createdAt
      }
    })
    return savedRecord as RunningRecord
  }

  async deleteByUserIdAndCreatedAt(userId: string, createdAt: Date, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.runningRecord.deleteMany({
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
