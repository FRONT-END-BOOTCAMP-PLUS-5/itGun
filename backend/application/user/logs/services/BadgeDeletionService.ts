import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { BenchPressRecordRepository } from "@/backend/domain/repositories/BenchPressRecordRepository"
import { DeadliftRecordRepository } from "@/backend/domain/repositories/DeadliftRecordRepository"
import { SquatRecordRepository } from "@/backend/domain/repositories/SquatRecordRepository"
import { RunningRecordRepository } from "@/backend/domain/repositories/RunningRecordRepository"
import { BigThreeRecordRepository } from "@/backend/domain/repositories/BigThreeRecordRepository"
import { BADGE_IDS, RECORD_BADGE_IDS } from "@/backend/application/user/logs/constants/badgeConstants"
import { Log } from "@/backend/domain/entities/Log"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class BadgeDeletionService {
  constructor(
    private userBadgeRepository: UserBadgeRepository,
    private logRepository: LogRepository,
    private benchPressRecordRepository: BenchPressRecordRepository,
    private deadliftRecordRepository: DeadliftRecordRepository,
    private squatRecordRepository: SquatRecordRepository,
    private runningRecordRepository: RunningRecordRepository,
    private bigThreeRecordRepository: BigThreeRecordRepository
  ) {}

  async handleBadgeDeletion(logToDelete: Log, tx?: TransactionClient) {
    const userId = logToDelete.userId
    const firstLog = await this.logRepository.findFirstByUserId(userId, tx)

    const userBadgesToRemove: number[] = []

    // 1. 첫 운동 뱃지
    await this.checkFirstWorkoutBadgeDeletion(
      userId,
      firstLog,
      userBadgesToRemove,
      tx
    )

    // 2. 연속 7일 뱃지 체크
    await this.checkConsecutiveBadgeDeletion(
      userId,
      logToDelete,
      userBadgesToRemove,
      tx
    )

    // 3. 일주일 3일 뱃지 체크
    await this.checkWeeklyBadgeAfterDeletion(
      userId,
      logToDelete,
      userBadgesToRemove,
      tx
    )

    // 4. 신기록 뱃지들 체크
    await this.deleteRecordBadges(
      userId,
      logToDelete,
      userBadgesToRemove,
      tx
    )

    // 5. 뱃지 삭제 실행
    try {
      if (userBadgesToRemove.length > 0) {
        await this.userBadgeRepository.deleteMany(userBadgesToRemove, tx)
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
    firstLog: Log | null,
    userBadgesToRemove: number[],
    tx?: TransactionClient
  ): Promise<void> {
    const userfirstWorkoutBadge =
      await this.userBadgeRepository.findByUserIdAndOptions(
        userId, 
        [BADGE_IDS.FIRST_WORKOUT], 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        tx
      )
    const hasFirstWorkBadge = userfirstWorkoutBadge.length > 0

    if (hasFirstWorkBadge && !firstLog) {
      userBadgesToRemove.push(userfirstWorkoutBadge[0].id)
    }
  }

  private async checkWeeklyBadgeAfterDeletion(
    userId: string,
    logToDelete: Log,
    userBadgesToRemove: number[],
    tx?: TransactionClient
  ): Promise<void> {

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
        [BADGE_IDS.WEEKLY_3_DAYS],
        startOfWeek,
        endOfWeek,
        "asc",
        undefined,
        tx
      )

    const hasWeeklyBadge = weeklyBadgesInPeriod.length > 0

    if (!hasWeeklyBadge) return

    const weekLogs = await this.logRepository.findAllByUserIdAndDateRange(
      userId,
      startOfWeek,
      endOfWeek,
      undefined,
      tx
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
    userBadgesToRemove: number[],
    tx?: TransactionClient
  ): Promise<void> {

     const deletedLogDate = new Date(logToDelete.logDate)
     deletedLogDate.setHours(0, 0, 0, 0)
     const endOfDay = new Date(deletedLogDate)
     endOfDay.setHours(23, 59, 59, 999)

     const logsOnSameDate = (
       await this.logRepository.findAllByUserIdAndDateRange(
         userId,
         deletedLogDate,
         endOfDay,
         undefined,
         tx
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
        [BADGE_IDS.CONSECUTIVE_7_DAYS],
        deletedLogDate,
        sevenDaysAfter,
        "asc",
        undefined,
        tx
      )

    const hasConsecutiveBadge = consecutiveBadgesInPeriod.length > 0

    if (hasConsecutiveBadge) {
      userBadgesToRemove.push(consecutiveBadgesInPeriod[0].id)
    }
  }

  private async deleteRecordBadges(
    userId: string,
    logToDelete: Log,
    userBadgesToRemove: number[],
    tx?: TransactionClient
  ): Promise<void> {
    const deletedLogDate = new Date(logToDelete.logDate)

    // 해당 로그와 같은 날짜 및 시간에 생성된 신기록 뱃지들 조회
    const recordBadgesOnDate =
      await this.userBadgeRepository.findByUserIdAndOptions(
        userId,
        [...RECORD_BADGE_IDS],
        deletedLogDate,
        deletedLogDate,
        undefined,
        undefined,
        tx
      )

    if (!recordBadgesOnDate || recordBadgesOnDate.length === 0) return

    const deletePromises: Promise<boolean>[] = []

    recordBadgesOnDate.forEach((userBadge) => {
      userBadgesToRemove.push(userBadge.id)

      if (userBadge.badgeId === BADGE_IDS.BENCH_PRESS_RECORD) {
        deletePromises.push(
          this.benchPressRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            userBadge.earnedAt,
            tx
          )
        )
      } else if (userBadge.badgeId === BADGE_IDS.SQUAT_RECORD) {
        deletePromises.push(
          this.squatRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            userBadge.earnedAt,
            tx
          )
        )
      } else if (userBadge.badgeId === BADGE_IDS.DEADLIFT_RECORD) {
        deletePromises.push(
          this.deadliftRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            userBadge.earnedAt,
            tx
          )
        )
      } else if (userBadge.badgeId === BADGE_IDS.RUNNING_RECORD) {
        deletePromises.push(
          this.runningRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            userBadge.earnedAt,
            tx
          )
        )
      } else if (userBadge.badgeId === BADGE_IDS.BIG_THREE_RECORD) {
        deletePromises.push(
          this.bigThreeRecordRepository.deleteByUserIdAndEarnedAt(
            userId,
            userBadge.earnedAt,
            tx
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
