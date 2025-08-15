import { UserBadge } from "@/backend/domain/entities/UserBadge"

export interface UserBadgeRepository {
  findAll(): Promise<UserBadge[]>
  findByUserId(
    userId: string,
    limit?: number,
    period?: number
  ): Promise<UserBadge[] | null>
  findByUserIdAndOptions(
    userId: string, 
    badgeIds?: number[],
    startDate?: Date,
    endDate?: Date,
    sortOrder?: "asc" | "desc",
    limit?: number
  ): Promise<UserBadge[]>
  save(userBadge: UserBadge): Promise<UserBadge>
  saveMany(userBadges: UserBadge[]): Promise<UserBadge[]>
  update(id: number, userBadge: Partial<UserBadge>): Promise<UserBadge | null>
  delete(id: number): Promise<boolean>
  deleteMany(userBadgeIds: number[]): Promise<boolean>
}
