import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"
import { BADGE_IDS } from "@/backend/application/user/logs/constants/badgeConstants"
import { Log } from "@/backend/domain/entities/Log"

export class WeeklyWorkoutBadgeService {
  constructor(
    private logRepository: LogRepository,
    private userBadgeRepository: UserBadgeRepository
  ) {}

  async check(
    userId: string,
    log : Log,
    tx?: TransactionClient
  ): Promise<UserBadge | null> {

    // 로그 날짜가 속한 주의 시작일 계산 (월요일 기준)
    const parsedDate = new Date(log.logDate)
    const dayOfWeek = parsedDate.getDay()
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

    const startOfWeek = new Date(parsedDate)
    startOfWeek.setDate(parsedDate.getDate() - daysFromMonday)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const weekLogs = await this.logRepository.findAllByUserIdAndDateRange(
      userId,
      startOfWeek,
      endOfWeek,
      false,
      tx
    )

    const workoutDatesThisWeek = new Set(
      weekLogs.map((log) => log.logDate.toLocaleDateString())
    )

    // 3일째 운동한 경우에만 뱃지 수여
    if (workoutDatesThisWeek.size >= 3) {
        const existingWeeklyBadges = await this.userBadgeRepository.findByUserIdAndOptions(
        userId,
        [BADGE_IDS.WEEKLY_3_DAYS],
        startOfWeek,
        endOfWeek,
        undefined,
        undefined,
        tx
      )

      if (existingWeeklyBadges.length > 0) return null

      return new UserBadge(0, BADGE_IDS.WEEKLY_3_DAYS, userId, log.logDate, log.createdAt)
    }

    return null
  }
}
