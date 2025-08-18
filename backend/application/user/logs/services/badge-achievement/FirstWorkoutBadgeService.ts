import { Badge } from "@/backend/domain/entities/Badge"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class FirstWorkoutBadgeService {
  constructor(private userBadgeRepository: UserBadgeRepository) {}

  async check(
    userId: string,
    badges: Badge[],
    logDate: Date,
    tx?: TransactionClient
  ): Promise<UserBadge | null> {
    const firstWorkoutBadge = badges.find((badge) =>
      badge.name.includes("첫 운동")
    )

    if (!firstWorkoutBadge) return null

    const existingBadge = await this.userBadgeRepository.findByUserIdAndOptions(
      userId,
      [firstWorkoutBadge.id],
      undefined,
      undefined,
      undefined,
      undefined,
      tx
    )

    if (existingBadge.length > 0) return null

    return new UserBadge(0, firstWorkoutBadge.id, userId, logDate)
  }
}
