import { BadgeRepository } from "@/backend/domain/repositories/BadgeRepository"
import { GetUserBadgeListQueryDto } from "../dtos/GetUserBadgeListQueryDto"
import { GetUserBadgeListDto } from "../dtos/GetUserBadgeListDto"
import { Badge } from "@/backend/domain/entities/Badge"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { GetBadgeDto } from "../dtos/GetBadgeDto"
import { GetUserBadgeDto } from "../dtos/GetUserBadgeDto"

export class GetUserBadgeListUsecase {
  constructor(
    private readonly badgeRepository: BadgeRepository,
    private readonly userBadgeRepository: UserBadgeRepository
  ) {}

  async execute(query: GetUserBadgeListQueryDto): Promise<GetUserBadgeListDto> {
    const badges: Badge[] = await this.badgeRepository.findAll()
    const getBadgesDtos: GetBadgeDto[] = badges.map((badge) => {
      return new GetBadgeDto(
        badge.id,
        badge.name,
        badge.expirationDays,
        badge.description
      )
    })

    let userBadges: UserBadge[] | null = query?.limit
      ? await this.userBadgeRepository.findLatestByBadgeIds(query.userId)
      : await this.userBadgeRepository.findByUserId(
          query.userId,
          undefined,
          query?.period
        )
    if (!userBadges) {
      return new GetUserBadgeListDto(getBadgesDtos, null)
    }

    const badgeCounts = new Map<
      number, // badgeId
      { count: number; latestEarnedAt: Date }
    >()

    for (const userBadge of userBadges) {
      const existing = badgeCounts.get(userBadge.badgeId)
      if (existing) {
        badgeCounts.set(userBadge.badgeId, {
          count: existing.count + 1,
          latestEarnedAt:
            userBadge.earnedAt > existing.latestEarnedAt
              ? userBadge.earnedAt
              : existing.latestEarnedAt,
        })
      } else {
        badgeCounts.set(userBadge.badgeId, {
          count: 1,
          latestEarnedAt: userBadge.earnedAt,
        })
      }
    }
    let getUserBadgeDtos: GetUserBadgeDto[] | null = null
    getUserBadgeDtos = Array.from(badgeCounts.entries()).map(
      ([badgeId, data]) => {
        return new GetUserBadgeDto(badgeId, data.count, data.latestEarnedAt)
      }
    )

    return new GetUserBadgeListDto(getBadgesDtos, getUserBadgeDtos)
  }
}
