import prisma from "../../../utils/prisma"
import { UserBadge } from "../../domain/entities/UserBadge"
import { UserBadgeRepository } from "../../domain/repositories/UserBadgeRepository"

export class PrUserBadgeRepository implements UserBadgeRepository {
  async findAll(): Promise<UserBadge[]> {
    const userBadges = await prisma.userBadge.findMany()
    return userBadges.map(this.toDomain)
  }

  async findByUserId(
    userId: string,
    limit?: number,
    period?: number
  ): Promise<UserBadge[] | null> {
    const whereCondition: any = { userId }

    if (period) {
      const date = new Date()
      date.setDate(date.getDate() - period)
      whereCondition.createdAt = {
        gte: date,
      }
    }

    const userBadges = await prisma.userBadge.findMany({
      where: whereCondition,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })

    if (!userBadges) {
      return null
    }

    return userBadges as UserBadge[]
  }

  async save(userBadge: UserBadge): Promise<UserBadge> {
    const savedUserBadge = await prisma.userBadge.create({
      data: {
        id: userBadge.id,
        badgeId: userBadge.badgeId,
        userId: userBadge.userId,
        createdAt: userBadge.createdAt,
      },
    })
    return this.toDomain(savedUserBadge)
  }

  async saveMany(userBadges: UserBadge[]): Promise<UserBadge[]> {
    const savedUserBadges = await prisma.$transaction(
      userBadges.map((userBadge) =>
        prisma.userBadge.create({
          data: {
            badgeId: userBadge.badgeId,
            userId: userBadge.userId,
            createdAt: userBadge.createdAt,
          },
        })
      )
    )

    return savedUserBadges as UserBadge[]
  }

  async update(
    id: number,
    userBadgeData: Partial<UserBadge>
  ): Promise<UserBadge | null> {
    try {
      const updatedUserBadge = await prisma.userBadge.update({
        where: { id },
        data: {
          ...(userBadgeData.badgeId !== undefined && {
            badgeId: userBadgeData.badgeId,
          }),
          ...(userBadgeData.userId && { userId: userBadgeData.userId }),
          ...(userBadgeData.createdAt && {
            createdAt: userBadgeData.createdAt,
          }),
        },
      })
      return this.toDomain(updatedUserBadge)
    } catch (error) {
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.userBadge.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  private toDomain(userBadge: any): UserBadge {
    return new UserBadge(
      userBadge.id,
      userBadge.badgeId,
      userBadge.userId,
      userBadge.createdAt
    )
  }
}
