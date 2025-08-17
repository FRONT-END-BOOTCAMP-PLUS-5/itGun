import { WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { AwardedBadgeDto } from "@/backend/application/user/logs/dtos/CreateLogResponseDto"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { BadgeRepository } from "@/backend/domain/repositories/BadgeRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { FirstWorkoutBadgeService } from "@/backend/application/user/logs/services/badge-achievement/FirstWorkoutBadgeService"
import { ConsecutiveDaysBadgeService } from "@/backend/application/user/logs/services/badge-achievement/ConsecutiveDaysBadgeService"
import { WeeklyWorkoutBadgeService } from "@/backend/application/user/logs/services/badge-achievement/WeeklyWorkoutBadgeService"
import { RecordBadgeService } from "@/backend/application/user/logs/services/badge-achievement/RecordBadgeService"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class BadgeAchievementService {
  private firstWorkoutBadgeService: FirstWorkoutBadgeService
  private consecutiveDaysBadgeService: ConsecutiveDaysBadgeService
  private weeklyWorkoutBadgeService: WeeklyWorkoutBadgeService
  private recordBadgeService: RecordBadgeService

  constructor(
    private badgeRepository: BadgeRepository,
    private userBadgeRepository: UserBadgeRepository,
    firstWorkoutBadgeService: FirstWorkoutBadgeService,
    consecutiveDaysBadgeService: ConsecutiveDaysBadgeService,
    weeklyWorkoutBadgeService: WeeklyWorkoutBadgeService,
    recordBadgeService: RecordBadgeService
  ) {
    this.firstWorkoutBadgeService = firstWorkoutBadgeService
    this.consecutiveDaysBadgeService = consecutiveDaysBadgeService
    this.weeklyWorkoutBadgeService = weeklyWorkoutBadgeService
    this.recordBadgeService = recordBadgeService
  }

  async checkAndAwardBadges(
    userId: string,
    workouts: WorkoutData[],
    logCreatedAt: Date,
    tx?: TransactionClient
  ): Promise<{ badges: AwardedBadgeDto[] }> {
    const [badges, existingRecords] = await Promise.all([
      this.badgeRepository.findAll(tx),
      this.recordBadgeService.getMaxRecords(userId, tx),
    ])

    const badgesToAward: UserBadge[] = []

    // 1. 첫 운동 뱃지 체크
    const firstWorkoutBadge = await this.firstWorkoutBadgeService.check(
      userId,
      badges,
      logCreatedAt,
      tx
    )
    if (firstWorkoutBadge) badgesToAward.push(firstWorkoutBadge)

    // 2. 연속 7일 뱃지 체크
    const consecutiveBadge = await this.consecutiveDaysBadgeService.check(
      userId,
      badges,
      logCreatedAt,
      tx
    )
    if (consecutiveBadge) badgesToAward.push(consecutiveBadge)

    // 3. 일주일에 3일 이상 뱃지 체크
    const weeklyBadge = await this.weeklyWorkoutBadgeService.check(userId, badges, logCreatedAt, tx)
    if (weeklyBadge) badgesToAward.push(weeklyBadge)

    // 4. 신기록 뱃지들 체크 및 개별 Record 저장
    const recordBadges = await this.recordBadgeService.checkAndSaveRecords(
      userId,
      workouts,
      badges,
      existingRecords,
      logCreatedAt,
      tx
    )
    badgesToAward.push(...recordBadges)

    // 5. 뱃지 저장
    let awardedBadges: AwardedBadgeDto[] = []

    if (badgesToAward.length > 0) {
      const savedUserBadges =
        await this.userBadgeRepository.saveMany(badgesToAward, tx)

      awardedBadges = savedUserBadges.map((userBadge) => {
        const badge = badges.find((badge) => badge.id === userBadge.badgeId)!
        return {
          badgeId: userBadge.badgeId,
          badgeName: badge.name,
          badgeDescription: badge.description,
          createdAt: userBadge.createdAt,
        }
      })
    }

    return { badges: awardedBadges }
  }
}
