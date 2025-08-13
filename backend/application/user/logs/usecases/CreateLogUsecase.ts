import { Log } from "@/backend/domain/entities/Log"
import { Workout } from "@/backend/domain/entities/Workout"
import { BodyPartGauge } from "@/backend/domain/entities/BodyPartGauge"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { BodyPartGaugeRepository } from "@/backend/domain/repositories/BodyPartGaugeRepository"
import { BadgeRepository } from "@/backend/domain/repositories/BadgeRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { UserRecordRepository } from "@/backend/domain/repositories/UserRecordRepository"
import { PrWorkoutRepository } from "@/backend/infrastructure/repositories/PrWorkoutRepository"
import { PrLogWorkoutRepository } from "@/backend/infrastructure/repositories/PrLogWorkoutRepository"
import { CreateLogRequestDto, WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { CreateLogResponseDto } from "@/backend/application/user/logs/dtos/CreateLogResponseDto"
import { calculateGaugeUpdates } from "@/backend/application/user/logs/utils/bodyPartGaugeCalculator"
import { BadgeAchievementService } from "@/backend/application/user/logs/services/BadgeAchievementService"

export class CreateLogUsecase {
  private badgeAchievementService: BadgeAchievementService

  constructor(
    private logRepository: LogRepository,
    private workoutRepository: PrWorkoutRepository,
    private logWorkoutRepository: PrLogWorkoutRepository,
    private bodyPartGaugeRepository: BodyPartGaugeRepository,
    private badgeRepository: BadgeRepository,
    private userBadgeRepository: UserBadgeRepository,
    private userRecordRepository: UserRecordRepository
  ) {
    this.badgeAchievementService = new BadgeAchievementService(
      badgeRepository,
      userBadgeRepository,
      userRecordRepository,
      logRepository
    )
  }

  async execute(request: CreateLogRequestDto): Promise<CreateLogResponseDto> {
    try {
      // 먼저 최신 body part gauge 데이터 조회
      const latestGauge = await this.bodyPartGaugeRepository.findLatestOneByUserId(request.userId)

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
        request.createdAt || new Date(),
        undefined, // logWorkouts
        gaugeUpdate
      )

      const savedLog = await this.logRepository.save(log)

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

      const existingWorkouts = await this.workoutRepository.findByMultipleCriteria(allCriteria)
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

      const workoutsToProcess: Workout[] = []
      const newWorkoutsToCreate: Workout[] = []

      for (const criteria of allCriteria) {
        const criteriaKey = JSON.stringify(criteria)
        const existingWorkout = existingWorkoutsMap.get(criteriaKey)
        
        if (existingWorkout) {
          workoutsToProcess.push(existingWorkout)
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
          newWorkoutsToCreate.push(newWorkout)
        }
      }

      if (newWorkoutsToCreate.length > 0) {
        const savedNewWorkouts = await this.workoutRepository.saveMany(newWorkoutsToCreate)
        workoutsToProcess.push(...savedNewWorkouts)
      }

      const logWorkouts = workoutsToProcess.map((workout) => ({
        logId: savedLog.id,
        workoutId: workout.id,
      }))

      const logWorkoutResult =
        await this.logWorkoutRepository.saveMany(logWorkouts)

      if (logWorkoutResult.count !== workoutsToProcess.length) {
        return {
          success: false,
          message: "운동 로그 연결 중 일부 실패가 발생했습니다.",
        }
      }

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
        new Date(),
        0
      )

      await this.bodyPartGaugeRepository.save(newBodyPartGauge)

      // 뱃지 달성 체크 및 사용자 기록 업데이트 (한 번에 처리)
      const { badges: awardedBadges } = await this.badgeAchievementService.checkAndAwardBadges(
        request.userId,
        request.workouts
      )

      return {
        success: true,
        message: `운동 로그가 성공적으로 생성되었습니다.${awardedBadges.length > 0 ? ` ${awardedBadges.length}개의 뱃지를 획득했습니다!` : ''}`,
        logId: savedLog.id,
        awardedBadges: awardedBadges,
      }
    } catch (error) {
      return {
        success: false,
        message: "운동 로그 생성 중 오류가 발생했습니다.",
      }
    }
  }
}
