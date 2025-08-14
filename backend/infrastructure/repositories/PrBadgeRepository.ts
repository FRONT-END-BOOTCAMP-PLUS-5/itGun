import prisma from "@/utils/prisma"
import { Badge } from "@/backend/domain/entities/Badge"
import { BadgeRepository } from "@/backend/domain/repositories/BadgeRepository"

export class PrBadgeRepository implements BadgeRepository {
  async findAll(): Promise<Badge[]> {
    const badges = await prisma.badge.findMany()
    return badges as Badge[]
  }

  async findById(id: number): Promise<Badge | null> {
    const badge = await prisma.badge.findUnique({
      where: { id },
    })
    return badge ? this.toDomain(badge) : null
  }

  async save(badge: Badge): Promise<Badge> {
    const savedBadge = await prisma.badge.create({
      data: {
        id: badge.id,
        name: badge.name,
        expirationDays: badge.expirationDays,
        description: badge.description,
      },
    })
    return this.toDomain(savedBadge)
  }

  async update(id: number, badgeData: Partial<Badge>): Promise<Badge | null> {
    try {
      const updatedBadge = await prisma.badge.update({
        where: { id },
        data: {
          ...(badgeData.name && { name: badgeData.name }),
          ...(badgeData.expirationDays !== undefined && {
            expirationDays: badgeData.expirationDays,
          }),
          ...(badgeData.description && { description: badgeData.description }),
        },
      })
      return this.toDomain(updatedBadge)
    } catch (error) {
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.badge.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  private toDomain(badge: any): Badge {
    return new Badge(
      badge.id,
      badge.name,
      badge.expirationDays,
      badge.description
    )
  }
}
