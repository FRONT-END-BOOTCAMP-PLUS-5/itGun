import { WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { Badge } from "@/backend/domain/entities/Badge"
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

export class RecordBadgeService {
  constructor(
    private benchPressRecordRepository: BenchPressRecordRepository,
    private squatRecordRepository: SquatRecordRepository,
    private deadliftRecordRepository: DeadliftRecordRepository,
    private runningRecordRepository: RunningRecordRepository,
    private bigThreeRecordRepository: BigThreeRecordRepository
  ) {}

  async getMaxRecords(userId: string) {
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

  async checkAndSaveRecords(
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
