import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"
import { BADGE_IDS } from "@/backend/application/user/logs/constants/badgeConstants"

export class ConsecutiveDaysBadgeService {
  constructor(
    private logRepository: LogRepository,
    private userBadgeRepository: UserBadgeRepository
  ) {}

  async check(
    userId: string,
    logDate: Date,
    tx?: TransactionClient
  ): Promise<UserBadge | null> {

    const parsedDate = new Date(logDate)
    parsedDate.setHours(23, 59, 59, 999)

    // 로그 날짜 포함 7일
    const sevenDaysAgo = new Date(parsedDate)
    sevenDaysAgo.setDate(parsedDate.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const recentLogs = await this.logRepository.findAllByUserIdAndDateRange(
      userId,
      sevenDaysAgo,
      parsedDate,
      false,
      tx
    )

    // 최근 7일간 운동한 날짜들
    const workoutDates = new Set(
      recentLogs.map((log) => log.createdAt.toDateString())
    )

    // 7일 연속 운동했는지 확인
    let consecutiveDays = 0
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(parsedDate)
      checkDate.setDate(parsedDate.getDate() - i)

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
      [BADGE_IDS.CONSECUTIVE_7_DAYS],
      sevenDaysAgo,
      parsedDate,
      "desc",
      undefined,
      tx
    )

    // 최근 7일 안에 이미 뱃지 받았으면 패스
    if (recentConsecutiveBadges.length > 0) {
      return null
    }

    return new UserBadge(0, BADGE_IDS.CONSECUTIVE_7_DAYS, userId, logDate)
  }
}
