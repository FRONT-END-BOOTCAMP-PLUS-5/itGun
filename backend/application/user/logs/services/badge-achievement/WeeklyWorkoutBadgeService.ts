import { Badge } from "@/backend/domain/entities/Badge"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"

export class WeeklyWorkoutBadgeService {
  constructor(
    private logRepository: LogRepository,
    private userBadgeRepository: UserBadgeRepository
  ) {}

  async check(
    userId: string,
    badges: Badge[],
    logCreatedAt: Date
  ): Promise<UserBadge | null> {
    const weeklyBadge = badges.find((badge) => badge.name.includes("3일"))

    if (!weeklyBadge) return null

    // 로그 날짜가 속한 주의 시작일 계산 (월요일 기준)
    const logDate = new Date(logCreatedAt)
    const dayOfWeek = logDate.getDay()
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

    const startOfWeek = new Date(logDate)
    startOfWeek.setDate(logDate.getDate() - daysFromMonday)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const weekLogs = await this.logRepository.findAllByUserIdAndDateRange(
      userId,
      startOfWeek,
      endOfWeek
    )

    const workoutDatesThisWeek = new Set(
      weekLogs.map((log) => log.createdAt.toDateString())
    )

    // 3일째 운동한 경우에만 뱃지 수여
    if (workoutDatesThisWeek.size === 3) {
        const existingWeeklyBadges = await this.userBadgeRepository.findByUserIdAndOptions(
        userId,
        [weeklyBadge.id],
        startOfWeek,
        endOfWeek
      )

      if (existingWeeklyBadges.length > 0) return null

      return new UserBadge(0, weeklyBadge.id, userId, logCreatedAt)
    }

    return null
  }
}
