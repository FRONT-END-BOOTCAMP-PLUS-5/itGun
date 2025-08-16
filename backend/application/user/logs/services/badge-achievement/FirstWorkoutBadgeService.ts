import { Badge } from "@/backend/domain/entities/Badge"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"

export class FirstWorkoutBadgeService {
  constructor(private userBadgeRepository: UserBadgeRepository) {}

  async check(
    userId: string,
    badges: Badge[],
    logCreatedAt: Date
  ): Promise<UserBadge | null> {
    const firstWorkoutBadge = badges.find((badge) =>
      badge.name.includes("첫 운동")
    )

    if (!firstWorkoutBadge) return null

    const existingBadge = await this.userBadgeRepository.findByUserIdAndOptions(
      userId,
      [firstWorkoutBadge.id]
    )

    if (existingBadge.length > 0) return null

    return new UserBadge(0, firstWorkoutBadge.id, userId, logCreatedAt)
  }
}
