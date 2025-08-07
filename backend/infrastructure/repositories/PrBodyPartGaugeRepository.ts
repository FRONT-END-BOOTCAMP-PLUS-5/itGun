import prisma from "../../../utils/prisma"
import { BodyPartGauge } from "../../domain/entities/BodyPartGauge"
import { BodyPartGaugeRepository } from "../../domain/repositories/BodyPartGaugeRepository"

export class PrBodyPartGaugeRepository implements BodyPartGaugeRepository {
  async findAll(): Promise<BodyPartGauge[]> {
    const gauges = await prisma.bodyPartGauge.findMany()
    return gauges.map(this.toDomain)
  }

  async findById(id: number): Promise<BodyPartGauge | null> {
    const gauge = await prisma.bodyPartGauge.findUnique({
      where: { id },
    })
    return gauge ? this.toDomain(gauge) : null
  }

  async findByUserId(id: string, date?: Date): Promise<BodyPartGauge | null> {
    const whereCondition: any = { userId: id }

    if (date) {
      whereCondition.createdAt = date
    }

    const userBodyPartGauge = await prisma.bodyPartGauge.findUnique({
      where: whereCondition,
    })

    return userBodyPartGauge ? this.toDomain(userBodyPartGauge) : null
  }

  async save(bodyPartGauge: BodyPartGauge): Promise<BodyPartGauge> {
    const savedGauge = await prisma.bodyPartGauge.create({
      data: {
        id: bodyPartGauge.id,
        userId: bodyPartGauge.userId,
        arms: bodyPartGauge.arms,
        legs: bodyPartGauge.legs,
        shoulders: bodyPartGauge.shoulders,
        back: bodyPartGauge.back,
        chest: bodyPartGauge.chest,
        core: bodyPartGauge.core,
        createdAt: bodyPartGauge.createdAt,
      },
    })
    return this.toDomain(savedGauge)
  }

  async update(
    id: number,
    gaugeData: Partial<BodyPartGauge>
  ): Promise<BodyPartGauge | null> {
    try {
      const updatedGauge = await prisma.bodyPartGauge.update({
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
        },
      })
      return this.toDomain(updatedGauge)
    } catch (error) {
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.bodyPartGauge.delete({
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
      gauge.createdAt
    )
  }
}
