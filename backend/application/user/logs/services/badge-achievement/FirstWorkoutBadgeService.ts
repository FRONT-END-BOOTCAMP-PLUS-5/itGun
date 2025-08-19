import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"
import { BADGE_IDS } from "@/backend/application/user/logs/constants/badgeConstants"

export class FirstWorkoutBadgeService {
  constructor(private userBadgeRepository: UserBadgeRepository) {}

  async check(
    userId: string,
    logDate: Date,
    tx?: TransactionClient
  ): Promise<UserBadge | null> {
    const existingBadge = await this.userBadgeRepository.findByUserIdAndOptions(
      userId,
      [BADGE_IDS.FIRST_WORKOUT],
      undefined,
      undefined,
      undefined,
      undefined,
      tx
    )

    if (existingBadge.length > 0) return null

    return new UserBadge(0, BADGE_IDS.FIRST_WORKOUT, userId, logDate)
  }
}
