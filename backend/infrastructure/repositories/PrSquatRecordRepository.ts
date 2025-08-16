import prisma from "@/utils/prisma"
import { SquatRecord } from "@/backend/domain/entities/SquatRecord"
import { SquatRecordRepository } from "@/backend/domain/repositories/SquatRecordRepository"

export class PrSquatRecordRepository implements SquatRecordRepository {
  async findMaxByUserId(userId: string): Promise<SquatRecord | null> {
    const record = await prisma.squatRecord.findFirst({
      where: { userId },
      orderBy: { weight: "desc" }
    })
    return record as SquatRecord || null
  }

  async findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<SquatRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const records = await prisma.squatRecord.findMany({
      where: whereCondition,
      orderBy: { createdAt: sortOrder || "desc" },
      take: limit
    })

    return records as SquatRecord[]
  }

  async save(record: SquatRecord): Promise<SquatRecord> {
    const savedRecord = await prisma.squatRecord.create({
      data: {
        userId: record.userId,
        weight: record.weight,
        createdAt: record.createdAt
      }
    })
    return savedRecord as SquatRecord
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

}
