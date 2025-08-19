import { Log } from "@/backend/domain/entities/Log"
import { Workout } from "@/backend/domain/entities/Workout"
import { BodyPartGauge } from "@/backend/domain/entities/BodyPartGauge"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { BodyPartGaugeRepository } from "@/backend/domain/repositories/BodyPartGaugeRepository"
import { BadgeRepository } from "@/backend/domain/repositories/BadgeRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { BenchPressRecordRepository } from "@/backend/domain/repositories/BenchPressRecordRepository"
import { SquatRecordRepository } from "@/backend/domain/repositories/SquatRecordRepository"
import { DeadliftRecordRepository } from "@/backend/domain/repositories/DeadliftRecordRepository"
import { RunningRecordRepository } from "@/backend/domain/repositories/RunningRecordRepository"
import { BigThreeRecordRepository } from "@/backend/domain/repositories/BigThreeRecordRepository"
import { WorkoutRepository } from "@/backend/domain/repositories/WorkoutRepository"
import { CreateLogRequestDto, WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { CreateLogResponseDto } from "@/backend/application/user/logs/dtos/CreateLogResponseDto"
import { calculateGaugeUpdates } from "@/backend/application/user/logs/utils/bodyPartGaugeCalculator"
import { BadgeAchievementService } from "@/backend/application/user/logs/services/BadgeAchievementService"
import { FirstWorkoutBadgeService } from "@/backend/application/user/logs/services/badge-achievement/FirstWorkoutBadgeService"
import { ConsecutiveDaysBadgeService } from "@/backend/application/user/logs/services/badge-achievement/ConsecutiveDaysBadgeService"
import { WeeklyWorkoutBadgeService } from "@/backend/application/user/logs/services/badge-achievement/WeeklyWorkoutBadgeService"
import { RecordBadgeService } from "@/backend/application/user/logs/services/badge-achievement/RecordBadgeService"
import { TransactionManager } from "@/backend/domain/repositories/TransactionManager"

export class CreateLogUsecase {
  private badgeAchievementService: BadgeAchievementService

  constructor(
    private transactionManager: TransactionManager,
    private logRepository: LogRepository,
    private workoutRepository: WorkoutRepository,
    private bodyPartGaugeRepository: BodyPartGaugeRepository,
    private badgeRepository: BadgeRepository,
    private userBadgeRepository: UserBadgeRepository,
    private benchPressRecordRepository: BenchPressRecordRepository,
    private squatRecordRepository: SquatRecordRepository,
    private deadliftRecordRepository: DeadliftRecordRepository,
    private runningRecordRepository: RunningRecordRepository,
    private bigThreeRecordRepository: BigThreeRecordRepository
  ) {
    const firstWorkoutBadgeService = new FirstWorkoutBadgeService(userBadgeRepository)
    const consecutiveDaysBadgeService = new ConsecutiveDaysBadgeService(logRepository, userBadgeRepository)
    const weeklyWorkoutBadgeService = new WeeklyWorkoutBadgeService(logRepository, userBadgeRepository)
    const recordBadgeService = new RecordBadgeService(
      benchPressRecordRepository,
      squatRecordRepository,
      deadliftRecordRepository,
      runningRecordRepository,
      bigThreeRecordRepository
    )

    this.badgeAchievementService = new BadgeAchievementService(
      badgeRepository,
      userBadgeRepository,
      firstWorkoutBadgeService,
      consecutiveDaysBadgeService,
      weeklyWorkoutBadgeService,
      recordBadgeService
    )
  }

  async execute(request: CreateLogRequestDto): Promise<CreateLogResponseDto> {
    try {
      return await this.transactionManager.executeInTransaction(async (tx) => {
        // 먼저 최신 body part gauge 데이터 조회
        const latestGauge = await this.bodyPartGaugeRepository.findLatestOneByUserId(request.userId, tx)

        // 현재 게이지를 BodyPartGaugeUpdate 형태로 변환
        const currentGauge = {
          legs: latestGauge?.legs || 0,
          back: latestGauge?.back || 0,
          chest: latestGauge?.chest || 0,
          shoulders: latestGauge?.shoulders || 0,
          arms: latestGauge?.arms || 0,
          core: latestGauge?.core || 0,
          stamina: latestGauge?.stamina || 0,
        }

        // 새로운 운동으로 인한 게이지 증가 계산
        const gaugeUpdate = calculateGaugeUpdates(request.workouts, currentGauge)

        // 로그 생성
        const log = new Log(
          0,
          request.userId,
          request.calIconType,
          request.totalDuration,
          request.logDate || new Date(),
          new Date(),
          undefined, // logWorkouts
          gaugeUpdate
        )

        const allCriteria: Partial<Workout>[] = []
        const workoutDataMap = new Map<string, WorkoutData>()

        for (const workoutData of request.workouts) {
          let matchingCriteria: Partial<Workout>

          if (workoutData.durationSeconds) {
            matchingCriteria = {
              seq: workoutData.seq,
              exerciseName: workoutData.exerciseName,
              setCount: workoutData.setCount,
              distance: workoutData.distance || 0,
              durationSeconds: workoutData.durationSeconds,
            }
          } else {
            matchingCriteria = {
              seq: workoutData.seq,
              exerciseName: workoutData.exerciseName,
              setCount: workoutData.setCount,
              weight: workoutData.weight || 0,
              repetitionCount: workoutData.repetitionCount,
            }
          }

          const criteriaKey = JSON.stringify(matchingCriteria)
          allCriteria.push(matchingCriteria)
          workoutDataMap.set(criteriaKey, workoutData)
        }

        const existingWorkouts = await this.workoutRepository.findByMultipleCriteria(allCriteria, tx)
        const existingWorkoutsMap = new Map<string, Workout>()

        for (const workout of existingWorkouts) {
          const key = JSON.stringify({
            seq: workout.seq,
            exerciseName: workout.exerciseName,
            setCount: workout.setCount,
            ...(workout.weight !== undefined && { weight: workout.weight }),
            ...(workout.repetitionCount !== undefined && { repetitionCount: workout.repetitionCount }),
            ...(workout.distance !== undefined && { distance: workout.distance }),
            ...(workout.durationSeconds !== undefined && { durationSeconds: workout.durationSeconds })
          })
          existingWorkoutsMap.set(key, workout)
        }

        const workoutToConnect: Pick<Workout, "id">[] = []
        const workoutToCreate: Workout[] = []

        for (const criteria of allCriteria) {
          const criteriaKey = JSON.stringify(criteria)
          const existingWorkout = existingWorkoutsMap.get(criteriaKey)
          
          if (existingWorkout) {
            workoutToConnect.push({ id: existingWorkout.id })
          } else {
            const workoutData = workoutDataMap.get(criteriaKey)
            const newWorkout = new Workout(
              0,
              workoutData!.seq,
              workoutData!.exerciseName,
              workoutData!.setCount,
              workoutData!.weight,
              workoutData!.repetitionCount,
              workoutData!.distance,
              workoutData!.durationSeconds
            )
            workoutToCreate.push(newWorkout)
          }
        }

        const savedLog = await this.logRepository.saveWithRelations(log, workoutToCreate, workoutToConnect, tx)

        // 새로운 body part gauge 생성 (기존 값 + 증가분)
        const newBodyPartGauge = new BodyPartGauge(
          request.userId,
          currentGauge.arms + gaugeUpdate.arms,
          currentGauge.legs + gaugeUpdate.legs,
          currentGauge.shoulders + gaugeUpdate.shoulders,
          currentGauge.back + gaugeUpdate.back,
          currentGauge.chest + gaugeUpdate.chest,
          currentGauge.core + gaugeUpdate.core,
          currentGauge.stamina + gaugeUpdate.stamina,
          savedLog.logDate,
          new Date(),
          0
        )

        await this.bodyPartGaugeRepository.save(newBodyPartGauge, tx)

        // 뱃지 달성 체크 및 신기록 저장
        const { badges: awardedBadges } = await this.badgeAchievementService.checkAndAwardBadges(
          request.userId,
          request.workouts,
          savedLog.logDate,
          tx
        )

        return {
          success: true,
          message: `운동 로그가 성공적으로 생성되었습니다. ${awardedBadges.length}개의 뱃지를 획득했습니다!`,
          logId: savedLog.id,
          awardedBadges: awardedBadges,
        }
      })
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "운동 로그 생성 중 오류가 발생했습니다.",
      }
    }
  }
}
