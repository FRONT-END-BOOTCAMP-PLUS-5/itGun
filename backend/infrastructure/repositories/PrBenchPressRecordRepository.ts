import prisma from "@/utils/prisma"
import { BenchPressRecord } from "@/backend/domain/entities/BenchPressRecord"
import { BenchPressRecordRepository } from "@/backend/domain/repositories/BenchPressRecordRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrBenchPressRecordRepository implements BenchPressRecordRepository {
  async findMaxByUserId(userId: string, tx?: TransactionClient): Promise<BenchPressRecord | null> {
    const client = tx || prisma
    const record = await client.benchPressRecord.findFirst({
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
    limit?: number,
    tx?: TransactionClient
  ): Promise<BenchPressRecord[]> {
    const whereCondition: any = { userId }

    if (startDate || endDate) {
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const client = tx || prisma
    const records = await client.benchPressRecord.findMany({
      where: whereCondition,
      orderBy: { createdAt: sortOrder || "desc" },
      take: limit
    })

    return records as BenchPressRecord[]
  }

  async save(record: BenchPressRecord, tx?: TransactionClient): Promise<BenchPressRecord> {
    const client = tx || prisma
    const savedRecord = await client.benchPressRecord.create({
      data: {
        userId: record.userId,
        weight: record.weight,
        createdAt: record.createdAt
      }
    })
    return savedRecord as BenchPressRecord
  }

  async deleteByUserIdAndCreatedAt(userId: string, createdAt: Date, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.benchPressRecord.deleteMany({
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
