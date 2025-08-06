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

    let userBadges: UserBadge[] | null =
      await this.userBadgeRepository.findByUserId(
        query.userId,
        query?.limit,
        query?.period
      )
    if (!userBadges) {
      return new GetUserBadgeListDto(getBadgesDtos, null)
    }

    const badgeCounts = new Map<
      number, // badgeId
      { count: number; latestCreatedAt: Date }
    >()

    for (const userBadge of userBadges) {
      const existing = badgeCounts.get(userBadge.badgeId)
      if (existing) {
        badgeCounts.set(userBadge.badgeId, {
          count: existing.count + 1,
          latestCreatedAt:
            userBadge.createdAt > existing.latestCreatedAt
              ? userBadge.createdAt
              : existing.latestCreatedAt,
        })
      } else {
        badgeCounts.set(userBadge.badgeId, {
          count: 1,
          latestCreatedAt: userBadge.createdAt,
        })
      }
    }
    let getUserBadgeDtos: GetUserBadgeDto[] | null = null
    getUserBadgeDtos = Array.from(badgeCounts.entries()).map(
      ([badgeId, data]) => {
        return new GetUserBadgeDto(badgeId, data.count, data.latestCreatedAt)
      }
    )

    return new GetUserBadgeListDto(getBadgesDtos, getUserBadgeDtos)
  }
}
