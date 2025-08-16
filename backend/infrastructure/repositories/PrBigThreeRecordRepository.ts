import prisma from "@/utils/prisma"
import { BigThreeRecord } from "@/backend/domain/entities/BigThreeRecord"
import { BigThreeRecordRepository } from "@/backend/domain/repositories/BigThreeRecordRepository"

export class PrBigThreeRecordRepository implements BigThreeRecordRepository {
  async findMaxByUserId(userId: string): Promise<BigThreeRecord | null> {
    const record = await prisma.bigThreeRecord.findFirst({
      where: { userId },
      orderBy: { weight: "desc" }
    })
    return record as BigThreeRecord || null
  }

  async findByUserIdAndOptions(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<BigThreeRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const records = await prisma.bigThreeRecord.findMany({
      where: whereCondition,
      orderBy: { createdAt: sortOrder || "desc" },
      take: limit
    })

    return records as BigThreeRecord[]
  }

  async save(record: BigThreeRecord): Promise<BigThreeRecord> {
    const savedRecord = await prisma.bigThreeRecord.create({
      data: {
        userId: record.userId,
        weight: record.weight,
        createdAt: record.createdAt
      }
    })
    return savedRecord as BigThreeRecord
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

}
