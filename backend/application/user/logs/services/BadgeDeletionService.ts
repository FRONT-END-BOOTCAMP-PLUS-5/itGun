import { BadgeRepository } from "@/backend/domain/repositories/BadgeRepository"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { BenchPressRecordRepository } from "@/backend/domain/repositories/BenchPressRecordRepository"
import { DeadliftRecordRepository } from "@/backend/domain/repositories/DeadliftRecordRepository"
import { SquatRecordRepository } from "@/backend/domain/repositories/SquatRecordRepository"
import { RunningRecordRepository } from "@/backend/domain/repositories/RunningRecordRepository"
import { BigThreeRecordRepository } from "@/backend/domain/repositories/BigThreeRecordRepository"
import { Log } from "@/backend/domain/entities/Log"
import { Badge } from "@/backend/domain/entities/Badge"

export class BadgeDeletionService {
  constructor(
    private userBadgeRepository: UserBadgeRepository,
    private badgeRepository: BadgeRepository,
    private logRepository: LogRepository,
    private benchPressRecordRepository: BenchPressRecordRepository,
    private deadliftRecordRepository: DeadliftRecordRepository,
    private squatRecordRepository: SquatRecordRepository,
    private runningRecordRepository: RunningRecordRepository,
    private bigThreeRecordRepository: BigThreeRecordRepository
  ) {}

  async handleBadgeDeletion(logToDelete: Log) {
    const userId = logToDelete.userId
    const [badges, firstLog] = await Promise.all([
      this.badgeRepository.findAll(),
      this.logRepository.findFirstByUserId(userId),
    ])

    const userBadgesToRemove: number[] = []

    // 1. 첫 운동 뱃지
    await this.checkFirstWorkoutBadgeDeletion(
      userId,
      badges,
      firstLog,
      userBadgesToRemove
    )

    // 2. 연속 7일 뱃지 체크
    await this.checkConsecutiveBadgeDeletion(
      userId,
      logToDelete,
      badges,
      userBadgesToRemove
    )

    // 3. 일주일 3일 뱃지 체크
    await this.checkWeeklyBadgeAfterDeletion(
      userId,
      logToDelete,
      badges,
      userBadgesToRemove
    )

    // 4. 신기록 뱃지들 체크
    await this.deleteRecordBadges(
      userId,
      logToDelete,
      badges,
      userBadgesToRemove,
    )

    // 5. 뱃지 삭제 실행
    try {
      if (userBadgesToRemove.length > 0) {
        await this.userBadgeRepository.deleteMany(userBadgesToRemove)
      }
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "운동 로그 삭제 중 오류가 발생했습니다.",
      }
    }
  }

  private async checkFirstWorkoutBadgeDeletion(
    userId: string,
    badges: Badge[],
    firstLog: Log | null,
    userBadgesToRemove: number[]
  ): Promise<void> {
    // TODO: 뱃지 종류 가져오는 코드는 Badge 부여할 때와 마찬가지로 실제 badge 테이블의 데이터 작성 후, 수정이 필요합니다!
    const firstWorkoutBadge = badges.find(
      (badge) =>
        badge.name.includes("첫 운동") || badge.name.includes("first workout")
    )

    if (firstWorkoutBadge) {
      const userfirstWorkoutBadge =
        await this.userBadgeRepository.findByUserIdAndOptions(userId, [
          firstWorkoutBadge.id,
        ])
      const hasFirstWorkBadge = userfirstWorkoutBadge.length > 0

      if (hasFirstWorkBadge) {
        if (!firstLog) {
          userBadgesToRemove.push(userfirstWorkoutBadge[0].id)
        }
      }
    }
  }

  private async checkWeeklyBadgeAfterDeletion(
    userId: string,
    logToDelete: Log,
    badges: Badge[],
    userBadgesToRemove: number[]
  ): Promise<void> {
    const weeklyBadge = badges.find(
      (badge) =>
        badge.name.includes("일주일 3일") ||
        badge.name.includes("주 3일") ||
        badge.name.includes("weekly 3")
    )

    if (!weeklyBadge) return

    const deletedLogDate = new Date(logToDelete.logDate)
    const dayOfWeek = deletedLogDate.getDay()
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

    const startOfWeek = new Date(deletedLogDate)
    startOfWeek.setDate(deletedLogDate.getDate() - daysFromMonday)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const weeklyBadgesInPeriod =
      await this.userBadgeRepository.findByUserIdAndOptions(
        userId,
        [weeklyBadge.id],
        startOfWeek,
        endOfWeek,
        "asc"
      )

    const hasWeeklyBadge = weeklyBadgesInPeriod.length > 0

    if (!hasWeeklyBadge) return

    const weekLogs = await this.logRepository.findAllByUserIdAndDateRange(
      userId,
      startOfWeek,
      endOfWeek
    )

    const remainingWeekLogs = weekLogs.filter(
      (log) => log.id !== logToDelete.id
    )
    const workoutDatesThisWeek = new Set(
      remainingWeekLogs.map((log) => log.logDate.toDateString())
    )

    if (workoutDatesThisWeek.size < 3) {
      userBadgesToRemove.push(weeklyBadgesInPeriod[0].id)
    }
  }

  private async checkConsecutiveBadgeDeletion(
    userId: string,
    logToDelete: Log,
    badges: Badge[],
    userBadgesToRemove: number[]
  ): Promise<void> {
    const consecutiveBadge = badges.find(
      (badge) =>
        badge.name.includes("연속 7일") ||
        badge.name.includes("7 days") ||
        badge.name.includes("연속")
    )

    if (!consecutiveBadge) return

     const deletedLogDate = new Date(logToDelete.logDate)
     deletedLogDate.setHours(0, 0, 0, 0)
     const endOfDay = new Date(deletedLogDate)
     endOfDay.setHours(23, 59, 59, 999)

     const logsOnSameDate = (
       await this.logRepository.findAllByUserIdAndDateRange(
         userId,
         deletedLogDate,
         endOfDay
       )
     ).filter((log) => log.id !== logToDelete.id)

     const hasLogOnSameDate = logsOnSameDate.length > 0

     if (hasLogOnSameDate) return

    // 해당 로그의 날짜를 포함한 7일 후까지의 날짜 범위 계산
    const sevenDaysAfter = new Date(deletedLogDate)
    sevenDaysAfter.setDate(deletedLogDate.getDate() + 6)
    sevenDaysAfter.setHours(23, 59, 59, 999)

    const consecutiveBadgesInPeriod =
      await this.userBadgeRepository.findByUserIdAndOptions(
        userId,
        [consecutiveBadge.id],
        deletedLogDate,
        sevenDaysAfter,
        "asc"
      )

    const hasConsecutiveBadge = consecutiveBadgesInPeriod.length > 0

    if (hasConsecutiveBadge) {
      userBadgesToRemove.push(consecutiveBadgesInPeriod[0].id)
    }
  }

  private async deleteRecordBadges(
    userId: string,
    logToDelete: Log,
    badges: Badge[],
    userBadgesToRemove: number[],
  ): Promise<void> {
    const deletedLogDate = new Date(logToDelete.logDate)

    // 각 운동별 신기록 뱃지 찾기
    const benchPressBadge = badges.find(
      (badge) =>
        badge.name.includes("벤치프레스") && badge.name.includes("신기록")
    )
    const squatBadge = badges.find(
      (badge) => badge.name.includes("스쿼트") && badge.name.includes("신기록")
    )
    const deadliftBadge = badges.find(
      (badge) =>
        badge.name.includes("데드리프트") && badge.name.includes("신기록")
    )
    const runningBadge = badges.find(
      (badge) => badge.name.includes("달리기") && badge.name.includes("신기록")
    )
    const bigThreeBadge = badges.find(
      (badge) => badge.name.includes("3대") && badge.name.includes("달성")
    )

    const badgeIds = [
      benchPressBadge,
      squatBadge,
      deadliftBadge,
      runningBadge,
      bigThreeBadge,
    ].map((badge) => badge!.id)

    // 해당 로그와 같은 날짜 및 시간에 생성된 신기록 뱃지들 조회
    const recordBadgesOnDate =
      await this.userBadgeRepository.findByUserIdAndOptions(
        userId,
        badgeIds,
        deletedLogDate,
        deletedLogDate
      )

    if (!recordBadgesOnDate || recordBadgesOnDate.length === 0) return

    const deletePromises: Promise<boolean>[] = []

    recordBadgesOnDate.forEach((ub) => {
      userBadgesToRemove.push(ub.id)

      if (ub.badgeId === benchPressBadge?.id) {
        deletePromises.push(
          this.benchPressRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            ub.earnedAt
          )
        )
      } else if (ub.badgeId === squatBadge?.id) {
        deletePromises.push(
          this.squatRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            ub.earnedAt
          )
        )
      } else if (ub.badgeId === deadliftBadge?.id) {
        deletePromises.push(
          this.deadliftRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            ub.earnedAt
          )
        )
      } else if (ub.badgeId === runningBadge?.id) {
        deletePromises.push(
          this.runningRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            ub.earnedAt
          )
        )
      } else if (ub.badgeId === bigThreeBadge?.id) {
        deletePromises.push(
          this.bigThreeRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            ub.earnedAt
          )
        )
      }
    })

    // 모든 레코드 삭제 실행
    if (deletePromises.length > 0) {
      try {
        await Promise.all(deletePromises)
      } catch (error) {
        console.log(error instanceof Error ? error.message : "신기록 레코드를 삭제하는 중 오류가 발생했습니다.")
      }
    }
  }
}
