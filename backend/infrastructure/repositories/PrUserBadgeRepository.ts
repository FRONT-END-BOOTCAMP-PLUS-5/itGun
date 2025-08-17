import prisma from "@/utils/prisma"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrUserBadgeRepository implements UserBadgeRepository {
  async findAll(tx?: TransactionClient): Promise<UserBadge[]> {
    const client = tx || prisma
    const userBadges = await client.userBadge.findMany()
    return userBadges.map(this.toDomain)
  }

  async findByUserId(
    userId: string,
    limit?: number,
    period?: number,
    tx?: TransactionClient
  ): Promise<UserBadge[] | null> {
    const whereCondition: any = { userId }

    if (period) {
      const date = new Date()
      date.setDate(date.getDate() - period)
      whereCondition.createdAt = {
        gte: date,
      }
    }

    const client = tx || prisma
    const userBadges = await client.userBadge.findMany({
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

  async findByUserIdAndOptions(
    userId: string,
    badgeIds?: number[],
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<UserBadge[]> {
    const whereCondition: any = { userId }

    if (badgeIds && badgeIds.length > 0) {
      whereCondition.badgeId = {
        in: badgeIds
      }
    }

    if (startDate || endDate) {
      whereCondition.createdAt = {}
      if (startDate) whereCondition.createdAt.gte = startDate
      if (endDate) whereCondition.createdAt.lte = endDate
    }

    const client = tx || prisma
    const userBadges = await client.userBadge.findMany({
      where: whereCondition,
      take: limit,
      orderBy: {
        createdAt: sortOrder || "desc",
      },
    })

    return userBadges as UserBadge[]
  }

  async save(userBadge: UserBadge, tx?: TransactionClient): Promise<UserBadge> {
    const client = tx || prisma
    const savedUserBadge = await client.userBadge.create({
      data: {
        id: userBadge.id,
        badgeId: userBadge.badgeId,
        userId: userBadge.userId,
        createdAt: userBadge.createdAt,
      },
    })
    return this.toDomain(savedUserBadge)
  }

  async saveMany(userBadges: UserBadge[], tx?: TransactionClient): Promise<UserBadge[]> {
    const client = tx || prisma
    
    if (tx) {
      const savedUserBadges: UserBadge[] = []
      for (const userBadge of userBadges) {
        const savedUserBadge = await client.userBadge.create({
          data: {
            badgeId: userBadge.badgeId,
            userId: userBadge.userId,
            createdAt: userBadge.createdAt,
          },
        })
        savedUserBadges.push(savedUserBadge as UserBadge)
      }
      return savedUserBadges
    } else {
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

  async deleteMany(userBadgeIds: number[]): Promise<boolean> {
    try {
      const deletedRecords = await prisma.userBadge.deleteMany({
        where: {
          id: {
            in: userBadgeIds
          }
        }
      })

      return (deletedRecords.count === userBadgeIds.length)
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
