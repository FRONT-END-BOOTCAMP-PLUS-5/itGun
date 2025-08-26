import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface UserBadgeRepository {
  findAll(tx?: TransactionClient): Promise<UserBadge[]>
  findByUserId(
    userId: string,
    limit?: number,
    period?: number,
    tx?: TransactionClient
  ): Promise<UserBadge[] | null>
  findByUserIdAndOptions(
    userId: string,
    badgeIds?: number[],
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<UserBadge[]>
  findByUserIdAndDates(
    userId: string,
    badgeIds: number[],
    deletedLogDate: Date,
    deletedLogCreatedAt: Date,
    sortOrder?: "asc" | "desc",
    limit?: number,
    tx?: TransactionClient
  ): Promise<UserBadge[]>
  save(userBadge: UserBadge, tx?: TransactionClient): Promise<UserBadge>
  saveMany(
    userBadges: UserBadge[],
    tx?: TransactionClient
  ): Promise<UserBadge[]>
  update(
    id: number,
    userBadge: Partial<UserBadge>,
    tx?: TransactionClient
  ): Promise<UserBadge | null>
  delete(id: number, tx?: TransactionClient): Promise<boolean>
  deleteMany(userBadgeIds: number[], tx?: TransactionClient): Promise<boolean>
}
