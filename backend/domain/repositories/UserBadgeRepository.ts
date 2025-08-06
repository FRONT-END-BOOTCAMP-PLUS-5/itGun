import { UserBadge } from "../entities/UserBadge"

export interface UserBadgeRepository {
  findAll(): Promise<UserBadge[]>
  findByUserId(
    userId: string,
    limit?: number,
    period?: number
  ): Promise<UserBadge[] | null>
  save(userBadge: UserBadge): Promise<UserBadge>
  update(id: number, userBadge: Partial<UserBadge>): Promise<UserBadge | null>
  delete(id: number): Promise<boolean>
}
