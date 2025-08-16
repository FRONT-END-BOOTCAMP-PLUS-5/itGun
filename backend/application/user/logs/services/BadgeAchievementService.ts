import { WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { AwardedBadgeDto } from "@/backend/application/user/logs/dtos/CreateLogResponseDto"
import { Badge } from "@/backend/domain/entities/Badge"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { BenchPressRecord } from "@/backend/domain/entities/BenchPressRecord"
import { SquatRecord } from "@/backend/domain/entities/SquatRecord"
import { DeadliftRecord } from "@/backend/domain/entities/DeadliftRecord"
import { RunningRecord } from "@/backend/domain/entities/RunningRecord"
import { BigThreeRecord } from "@/backend/domain/entities/BigThreeRecord"
import { BadgeRepository } from "@/backend/domain/repositories/BadgeRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { BenchPressRecordRepository } from "@/backend/domain/repositories/BenchPressRecordRepository"
import { SquatRecordRepository } from "@/backend/domain/repositories/SquatRecordRepository"
import { DeadliftRecordRepository } from "@/backend/domain/repositories/DeadliftRecordRepository"
import { RunningRecordRepository } from "@/backend/domain/repositories/RunningRecordRepository"
import { BigThreeRecordRepository } from "@/backend/domain/repositories/BigThreeRecordRepository"
import {
  RECORD_EXERCISE_IDS,
  RECORD_MINIMUMS,
  BIG_THREE_BADGE_UNIT,
} from "@/backend/application/user/logs/constants/userRecordConstants"

export class BadgeAchievementService {
  constructor(
    private badgeRepository: BadgeRepository,
    private userBadgeRepository: UserBadgeRepository,
    private logRepository: LogRepository,
    private benchPressRecordRepository: BenchPressRecordRepository,
    private squatRecordRepository: SquatRecordRepository,
    private deadliftRecordRepository: DeadliftRecordRepository,
    private runningRecordRepository: RunningRecordRepository,
    private bigThreeRecordRepository: BigThreeRecordRepository
  ) {}

  async checkAndAwardBadges(
    userId: string,
    workouts: WorkoutData[],
    logCreatedAt: Date
  ): Promise<{ badges: AwardedBadgeDto[] }> {
    const [badges, existingRecords] = await Promise.all([
      this.badgeRepository.findAll(),
      this.getMaxRecords(userId),
    ])

    const badgesToAward: UserBadge[] = []

    // 1. 첫 운동 뱃지 체크
    const firstWorkoutBadge = await this.checkFirstWorkoutBadge(
      userId,
      badges,
      logCreatedAt
    )
    if (firstWorkoutBadge) badgesToAward.push(firstWorkoutBadge)

    // 2. 연속 7일 뱃지 체크
    const consecutiveBadge = await this.checkConsecutiveDaysBadge(
      userId,
      badges,
      logCreatedAt
    )
    if (consecutiveBadge) badgesToAward.push(consecutiveBadge)

    // 3. 일주일에 3일 이상 뱃지 체크
    const weeklyBadge = await this.checkWeeklyWorkoutBadge(userId, badges, logCreatedAt)
    if (weeklyBadge) badgesToAward.push(weeklyBadge)

    // 4. 신기록 뱃지들 체크 및 개별 Record 저장
    const recordBadges = await this.checkRecordBadgesAndSaveRecords(
      userId,
      workouts,
      badges,
      existingRecords,
      logCreatedAt
    )
    badgesToAward.push(...recordBadges)

    // 5. 뱃지 저장
    let awardedBadges: AwardedBadgeDto[] = []

    if (badgesToAward.length > 0) {
      const savedUserBadges =
        await this.userBadgeRepository.saveMany(badgesToAward)

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

  private async checkFirstWorkoutBadge(
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

  private async checkConsecutiveDaysBadge(
    userId: string,
    badges: Badge[],
    logCreatedAt: Date
  ): Promise<UserBadge | null> {
    const consecutiveBadge = badges.find(
      (badge) =>
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

  private async checkWeeklyWorkoutBadge(
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

    // 해당 주에 운동한 날짜 수 계산
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

  private async getMaxRecords(userId: string) {
    const [benchPress, squat, deadlift, running, bigThree] = await Promise.all([
      this.benchPressRecordRepository.findMaxByUserId(userId),
      this.squatRecordRepository.findMaxByUserId(userId),
      this.deadliftRecordRepository.findMaxByUserId(userId),
      this.runningRecordRepository.findMaxByUserId(userId),
      this.bigThreeRecordRepository.findMaxByUserId(userId),
    ])

    return {
      benchPress,
      squat,
      deadlift,
      running,
      bigThree,
    }
  }

  private async checkRecordBadgesAndSaveRecords(
    userId: string,
    workouts: WorkoutData[],
    badges: Badge[],
    existingRecords: {
      benchPress: BenchPressRecord | null
      squat: SquatRecord | null
      deadlift: DeadliftRecord | null
      running: RunningRecord | null
      bigThree: BigThreeRecord | null
    },
    logCreatedAt: Date
  ): Promise<UserBadge[]> {
    const awardedBadges: UserBadge[] = []

    const recordExerciseIds = Object.values(RECORD_EXERCISE_IDS)
    const recordWorkouts = workouts.filter((workout) =>
      recordExerciseIds.includes(
        workout.exerciseInfo.exerciseId as (typeof recordExerciseIds)[number]
      )
    )


    // 이번 로그에서의 최대값
    const logMaxRecords = {
      benchPress: Math.max(
        ...recordWorkouts
          .filter(
            (workout) =>
              workout.exerciseInfo.exerciseId === RECORD_EXERCISE_IDS.BENCH_PRESS &&
              workout.weight
          )
          .map((workout) => workout.weight || 0),
        0
      ),
      squat: Math.max(
        ...recordWorkouts
          .filter(
            (workout) =>
              workout.exerciseInfo.exerciseId === RECORD_EXERCISE_IDS.SQUAT &&
              workout.weight
          )
          .map((workout) => workout.weight || 0),
        0
      ),
      deadlift: Math.max(
        ...recordWorkouts
          .filter(
            (workout) =>
              workout.exerciseInfo.exerciseId === RECORD_EXERCISE_IDS.DEADLIFT &&
              workout.weight
          )
          .map((workout) => workout.weight || 0),
        0
      ),
      running: Math.max(
        ...recordWorkouts
          .filter(
            (workout) =>
              workout.exerciseInfo.exerciseId === RECORD_EXERCISE_IDS.RUNNING &&
              workout.distance
          )
          .map((workout) => workout.distance || 0),
        0
      ),
    }

    // 벤치프레스
    if (logMaxRecords.benchPress > (existingRecords.benchPress?.weight || 0)) {
      const newRecord = new BenchPressRecord(
        userId,
        logMaxRecords.benchPress,
        logCreatedAt
      )
      await this.benchPressRecordRepository.save(newRecord)

      if (logMaxRecords.benchPress >= RECORD_MINIMUMS.BENCH_PRESS) {
        const benchBadge = badges.find(
          (badge) =>
            badge.name.includes("벤치프레스") && badge.name.includes("신기록")
        )
        if (benchBadge) {
          const userBadge = new UserBadge(0, benchBadge.id, userId, logCreatedAt)
          awardedBadges.push(userBadge)
        }
      }
    }

    // 스쿼트
    if (logMaxRecords.squat > (existingRecords.squat?.weight || 0)) {
      const newRecord = new SquatRecord(userId, logMaxRecords.squat, logCreatedAt)
      await this.squatRecordRepository.save(newRecord)

      if (logMaxRecords.squat >= RECORD_MINIMUMS.SQUAT) {
        const squatBadge = badges.find(
          (badge) =>
            badge.name.includes("스쿼트") && badge.name.includes("신기록")
        )
        if (squatBadge) {
          const userBadge = new UserBadge(0, squatBadge.id, userId, logCreatedAt)
          awardedBadges.push(userBadge)
        }
      }
    }

    // 데드리프트
    if (logMaxRecords.deadlift > (existingRecords.deadlift?.weight || 0)) {
      const newRecord = new DeadliftRecord(
        userId,
        logMaxRecords.deadlift,
        logCreatedAt
      )
      await this.deadliftRecordRepository.save(newRecord)

      if (logMaxRecords.deadlift >= RECORD_MINIMUMS.DEADLIFT) {
        const deadliftBadge = badges.find(
          (badge) =>
            badge.name.includes("데드리프트") && badge.name.includes("신기록")
        )
        if (deadliftBadge) {
          const userBadge = new UserBadge(0, deadliftBadge.id, userId, logCreatedAt)
          awardedBadges.push(userBadge)
        }
      }
    }

    // 달리기
    if (logMaxRecords.running > (existingRecords.running?.distance || 0)) {
      const newRecord = new RunningRecord(
        userId,
        logMaxRecords.running,
        logCreatedAt
      )
      await this.runningRecordRepository.save(newRecord)

      if (logMaxRecords.running >= RECORD_MINIMUMS.RUNNING) {
        const runningBadge = badges.find(
          (badge) =>
            badge.name.includes("달리기") && badge.name.includes("신기록")
        )
        if (runningBadge) {
          const userBadge = new UserBadge(0, runningBadge.id, userId, logCreatedAt)
          awardedBadges.push(userBadge)
        }
      }
    }

    const currentBigThree = Math.max(logMaxRecords.benchPress, existingRecords.benchPress?.weight || 0)
        + Math.max(logMaxRecords.squat, existingRecords.squat?.weight || 0)
        + Math.max(logMaxRecords.deadlift, existingRecords.deadlift?.weight || 0)
    const previousBigThree = existingRecords.bigThree?.weight || 0

    // 새로운 100kg 구간을 달성했는지 확인
    const currentLevel = Math.floor(currentBigThree / BIG_THREE_BADGE_UNIT)
    const previousLevel = Math.floor(previousBigThree / BIG_THREE_BADGE_UNIT)

    if (currentBigThree > previousBigThree) {
      const newRecord = new BigThreeRecord(userId, currentBigThree, logCreatedAt)
      await this.bigThreeRecordRepository.save(newRecord)

      if (currentLevel > previousLevel && currentBigThree >= BIG_THREE_BADGE_UNIT) {
        const bigThreeBadge = badges.find(
          (badge) => badge.name.includes("3대") && badge.name.includes("달성")
        )

        if (bigThreeBadge) {
          const userBadge = new UserBadge(0, bigThreeBadge.id, userId, logCreatedAt)
          awardedBadges.push(userBadge)
        }
      }
    }

    return awardedBadges
  }
}
