import prisma from "../../../utils/prisma"
import { BodyPartGauge } from "../../domain/entities/BodyPartGauge"
import { BodyPartGaugeRepository } from "../../domain/repositories/BodyPartGaugeRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrBodyPartGaugeRepository implements BodyPartGaugeRepository {
  async findAll(tx?: TransactionClient): Promise<BodyPartGauge[]> {
    const client = tx || prisma
    const gauges = await client.bodyPartGauge.findMany()
    return gauges.map(this.toDomain)
  }

  async findById(id: number, tx?: TransactionClient): Promise<BodyPartGauge | null> {
    const client = tx || prisma
    const gauge = await client.bodyPartGauge.findUnique({
      where: { id },
    })
    return gauge ? this.toDomain(gauge) : null
  }

  async findByUserId(id: string, date?: Date, tx?: TransactionClient): Promise<BodyPartGauge | null> {
    const whereCondition: any = { userId: id }

    if (date) {
      whereCondition.earnedAt = date
    }

    const client = tx || prisma
    const userBodyPartGauge = await client.bodyPartGauge.findUnique({
      where: whereCondition,
    })

    return userBodyPartGauge as BodyPartGauge || null
  }

  async findLatestOneByUserId(userId: string, tx?: TransactionClient): Promise<BodyPartGauge | null> {
    const client = tx || prisma
    const gauge = await client.bodyPartGauge.findFirst({
      where: { userId },
      orderBy: { earnedAt: "desc" },
    })
    return gauge as BodyPartGauge || null
  }

  async save(bodyPartGauge: BodyPartGauge, tx?: TransactionClient): Promise<BodyPartGauge> {
    const client = tx || prisma
    const savedGauge = await client.bodyPartGauge.create({
      data: {
        userId: bodyPartGauge.userId,
        arms: bodyPartGauge.arms,
        legs: bodyPartGauge.legs,
        shoulders: bodyPartGauge.shoulders,
        back: bodyPartGauge.back,
        chest: bodyPartGauge.chest,
        core: bodyPartGauge.core,
        stamina: bodyPartGauge.stamina,
        earnedAt: bodyPartGauge.earnedAt,
        createdAt: new Date(),
      },
    })
    return savedGauge as BodyPartGauge
  }

  async update(
    id: number,
    gaugeData: Partial<BodyPartGauge>,
    tx?: TransactionClient
  ): Promise<BodyPartGauge | null> {
    try {
      const client = tx || prisma
      const updatedGauge = await client.bodyPartGauge.update({
        where: { id },
        data: {
          ...(gaugeData.userId && { userId: gaugeData.userId }),
          ...(gaugeData.arms !== undefined && { arms: gaugeData.arms }),
          ...(gaugeData.legs !== undefined && { legs: gaugeData.legs }),
          ...(gaugeData.shoulders !== undefined && {
            shoulders: gaugeData.shoulders,
          }),
          ...(gaugeData.back !== undefined && { back: gaugeData.back }),
          ...(gaugeData.chest !== undefined && { chest: gaugeData.chest }),
          ...(gaugeData.core !== undefined && { core: gaugeData.core }),
          ...(gaugeData.stamina !== undefined && { core: gaugeData.stamina }),
        },
      })
      return this.toDomain(updatedGauge)
    } catch (error) {
      return null
    }
  }

  async delete(id: number, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.bodyPartGauge.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  private toDomain(gauge: any): BodyPartGauge {
    return new BodyPartGauge(
      gauge.id,
      gauge.userId,
      gauge.arms,
      gauge.legs,
      gauge.shoulders,
      gauge.back,
      gauge.chest,
      gauge.core,
      gauge.stamina,
      gauge.earnedAt,
      gauge.createdAt
    )
  }
}
