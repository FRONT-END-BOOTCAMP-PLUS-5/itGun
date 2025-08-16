import { Badge } from "@/backend/domain/entities/Badge"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"

export class ConsecutiveDaysBadgeService {
  constructor(
    private logRepository: LogRepository,
    private userBadgeRepository: UserBadgeRepository
  ) {}

  async check(
    userId: string,
    badges: Badge[],
    logCreatedAt: Date
  ): Promise<UserBadge | null> {
    const consecutiveBadge = badges.find((badge) =>
      badge.name.includes("연속 7일")
    )

    if (!consecutiveBadge) return null

    const logDate = new Date(logCreatedAt)
    logDate.setHours(23, 59, 59, 999)

    // 로그 날짜 포함 7일
    const sevenDaysAgo = new Date(logDate)
    sevenDaysAgo.setDate(logDate.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const recentLogs = await this.logRepository.findAllByUserIdAndDateRange(
      userId,
      sevenDaysAgo,
      logDate
    )

    // 최근 7일간 운동한 날짜들
    const workoutDates = new Set(
      recentLogs.map((log) => log.createdAt.toDateString())
    )

    // 7일 연속 운동했는지 확인
    let consecutiveDays = 0
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(logDate)
      checkDate.setDate(logDate.getDate() - i)

      if (workoutDates.has(checkDate.toDateString())) {
        consecutiveDays++
      } else {
        break
      }
    }

    if (consecutiveDays < 7) return null

    // 최근 받은 연속 7일 뱃지 찾기 (userId와 badgeId로 조회)
    const recentConsecutiveBadges = await this.userBadgeRepository.findByUserIdAndOptions(
      userId,
      [consecutiveBadge.id],
      sevenDaysAgo,
      logDate,
      "desc"
    )

    // 최근 7일 안에 이미 뱃지 받았으면 패스
    if (recentConsecutiveBadges.length > 0) {
      return null
    }

    return new UserBadge(0, consecutiveBadge.id, userId, logCreatedAt)
  }
}
