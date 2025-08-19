import prisma from "@/utils/prisma"
import { BigThreeRecord } from "@/backend/domain/entities/BigThreeRecord"
import { BigThreeRecordRepository } from "@/backend/domain/repositories/BigThreeRecordRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrBigThreeRecordRepository implements BigThreeRecordRepository {
  async findMaxByUserId(userId: string, tx?: TransactionClient): Promise<BigThreeRecord | null> {
    const client = tx || prisma
    const record = await client.bigThreeRecord.findFirst({
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
    limit?: number,
    tx?: TransactionClient
  ): Promise<BigThreeRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.earnedAt = {}
      if (startDate) whereCondition.earnedAt.gte = startDate
      if (endDate) whereCondition.earnedAt.lte = endDate
    }

    const client = tx || prisma
    const records = await client.bigThreeRecord.findMany({
      where: whereCondition,
      orderBy: { earnedAt: sortOrder || "desc" },
      take: limit
    })

    return records as BigThreeRecord[]
  }

  async save(record: BigThreeRecord, tx?: TransactionClient): Promise<BigThreeRecord> {
    const client = tx || prisma
    const savedRecord = await client.bigThreeRecord.create({
      data: {
        userId: record.userId,
        weight: record.weight,
        earnedAt: record.earnedAt
      }
    })
    return savedRecord as BigThreeRecord
  }

  async deleteByUserIdAndEarnedAt(userId: string, earnedAt: Date, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.bigThreeRecord.deleteMany({
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
