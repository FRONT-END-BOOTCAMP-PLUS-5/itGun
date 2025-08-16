import prisma from "@/utils/prisma"
import { RunningRecord } from "@/backend/domain/entities/RunningRecord"
import { RunningRecordRepository } from "@/backend/domain/repositories/RunningRecordRepository"

export class PrRunningRecordRepository implements RunningRecordRepository {
  async findMaxByUserId(userId: string): Promise<RunningRecord | null> {
    const record = await prisma.runningRecord.findFirst({
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
    limit?: number
  ): Promise<RunningRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const records = await prisma.runningRecord.findMany({
      where: whereCondition,
      orderBy: { createdAt: sortOrder || "desc" },
      take: limit
    })

    return records as RunningRecord[]
  }

  async save(record: RunningRecord): Promise<RunningRecord> {
    const savedRecord = await prisma.runningRecord.create({
      data: {
        userId: record.userId,
        distance: record.distance,
        createdAt: record.createdAt
      }
    })
    return savedRecord as RunningRecord
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

}
