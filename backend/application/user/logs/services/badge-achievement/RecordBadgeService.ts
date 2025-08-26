import { WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { BenchPressRecord } from "@/backend/domain/entities/BenchPressRecord"
import { SquatRecord } from "@/backend/domain/entities/SquatRecord"
import { DeadliftRecord } from "@/backend/domain/entities/DeadliftRecord"
import { RunningRecord } from "@/backend/domain/entities/RunningRecord"
import { BigThreeRecord } from "@/backend/domain/entities/BigThreeRecord"
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
import { BADGE_IDS } from "@/backend/application/user/logs/constants/badgeConstants"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"
import { Log } from "@/backend/domain/entities/Log"

export class RecordBadgeService {
  constructor(
    private benchPressRecordRepository: BenchPressRecordRepository,
    private squatRecordRepository: SquatRecordRepository,
    private deadliftRecordRepository: DeadliftRecordRepository,
    private runningRecordRepository: RunningRecordRepository,
    private bigThreeRecordRepository: BigThreeRecordRepository
  ) {}

  async getMaxRecords(userId: string, tx?: TransactionClient) {
    const [benchPress, squat, deadlift, running, bigThree] = await Promise.all([
      this.benchPressRecordRepository.findMaxByUserId(userId, tx),
      this.squatRecordRepository.findMaxByUserId(userId, tx),
      this.deadliftRecordRepository.findMaxByUserId(userId, tx),
      this.runningRecordRepository.findMaxByUserId(userId, tx),
      this.bigThreeRecordRepository.findMaxByUserId(userId, tx),
    ])

    return {
      benchPress,
      squat,
      deadlift,
      running,
      bigThree,
    }
  }

  async checkAndSaveRecords(
    userId: string,
    workouts: WorkoutData[],
    existingRecords: {
      benchPress: BenchPressRecord | null
      squat: SquatRecord | null
      deadlift: DeadliftRecord | null
      running: RunningRecord | null
      bigThree: BigThreeRecord | null
    },
    log: Log,
    tx?: TransactionClient
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
              workout.exerciseInfo.exerciseId ===
                RECORD_EXERCISE_IDS.BENCH_PRESS && workout.weight
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
              workout.exerciseInfo.exerciseId ===
                RECORD_EXERCISE_IDS.DEADLIFT && workout.weight
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
        log.logDate,
        log.createdAt
      )
      await this.benchPressRecordRepository.save(newRecord, tx)

      if (logMaxRecords.benchPress >= RECORD_MINIMUMS.BENCH_PRESS) {
        const userBadge = new UserBadge(
          0,
          BADGE_IDS.BENCH_PRESS_RECORD,
          userId,
          log.logDate,
          log.createdAt
        )
        awardedBadges.push(userBadge)
      }
    }

    // 스쿼트
    if (logMaxRecords.squat > (existingRecords.squat?.weight || 0)) {
      const newRecord = new SquatRecord(
        userId,
        logMaxRecords.squat,
        log.logDate,
        log.createdAt
      )
      await this.squatRecordRepository.save(newRecord, tx)

      if (logMaxRecords.squat >= RECORD_MINIMUMS.SQUAT) {
        const userBadge = new UserBadge(
          0,
          BADGE_IDS.SQUAT_RECORD,
          userId,
          log.logDate,
          log.createdAt
        )
        awardedBadges.push(userBadge)
      }
    }

    // 데드리프트
    if (logMaxRecords.deadlift > (existingRecords.deadlift?.weight || 0)) {
      try {
        const newRecord = new DeadliftRecord(
          userId,
          logMaxRecords.deadlift,
          log.logDate,
          log.createdAt
        )

        await this.deadliftRecordRepository.save(newRecord, tx)

        if (logMaxRecords.deadlift >= RECORD_MINIMUMS.DEADLIFT) {
          const userBadge = new UserBadge(
            0,
            BADGE_IDS.DEADLIFT_RECORD,
            userId,
            log.logDate,
            log.createdAt
          )
          awardedBadges.push(userBadge)
        }
      } catch (error) {
        console.error("Error saving deadlift record:", error)
        throw error
      }
    }

    // 달리기
    if (logMaxRecords.running > (existingRecords.running?.distance || 0)) {
      const newRecord = new RunningRecord(
        userId,
        logMaxRecords.running,
        log.logDate,
        log.createdAt
      )
      await this.runningRecordRepository.save(newRecord, tx)

      if (logMaxRecords.running >= RECORD_MINIMUMS.RUNNING) {
        const userBadge = new UserBadge(
          0,
          BADGE_IDS.RUNNING_RECORD,
          userId,
          log.logDate,
          log.createdAt
        )
        awardedBadges.push(userBadge)
      }
    }

    const currentBigThree =
      Math.max(
        logMaxRecords.benchPress,
        existingRecords.benchPress?.weight || 0
      ) +
      Math.max(logMaxRecords.squat, existingRecords.squat?.weight || 0) +
      Math.max(logMaxRecords.deadlift, existingRecords.deadlift?.weight || 0)
    const previousBigThree = existingRecords.bigThree?.weight || 0

    // 새로운 100kg 구간을 달성했는지 확인
    const currentLevel = Math.floor(currentBigThree / BIG_THREE_BADGE_UNIT)
    const previousLevel = Math.floor(previousBigThree / BIG_THREE_BADGE_UNIT)

    if (currentBigThree > previousBigThree) {
      try {
        const newRecord = new BigThreeRecord(
          userId,
          currentBigThree,
          log.logDate,
          log.createdAt
        )

        await this.bigThreeRecordRepository.save(newRecord, tx)

        if (
          currentLevel > previousLevel &&
          currentBigThree >= BIG_THREE_BADGE_UNIT
        ) {
          const userBadge = new UserBadge(
            0,
            BADGE_IDS.BIG_THREE_RECORD,
            userId,
            log.logDate,
            log.createdAt
          )
          awardedBadges.push(userBadge)
        }
      } catch (error) {
        console.error("Error saving BigThree record:", error)
        throw error
      }
    }

    return awardedBadges
  }
}
