import prisma from "@/utils/prisma"
import { SquatRecord } from "@/backend/domain/entities/SquatRecord"
import { SquatRecordRepository } from "@/backend/domain/repositories/SquatRecordRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrSquatRecordRepository implements SquatRecordRepository {
  async findMaxByUserId(userId: string, tx?: TransactionClient): Promise<SquatRecord | null> {
    const client = tx || prisma
    const record = await client.squatRecord.findFirst({
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
    limit?: number,
    tx?: TransactionClient
  ): Promise<SquatRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const client = tx || prisma
    const records = await client.squatRecord.findMany({
      where: whereCondition,
      orderBy: { createdAt: sortOrder || "desc" },
      take: limit
    })

    return records as SquatRecord[]
  }

  async save(record: SquatRecord, tx?: TransactionClient): Promise<SquatRecord> {
    const client = tx || prisma
    const savedRecord = await client.squatRecord.create({
      data: {
        userId: record.userId,
        weight: record.weight,
        createdAt: record.createdAt
      }
    })
    return savedRecord as SquatRecord
  }

  async deleteByUserIdAndCreatedAt(userId: string, createdAt: Date, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.squatRecord.deleteMany({
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
