import { Log } from "../../../../domain/entities/Log"
import { Workout } from "../../../../domain/entities/Workout"
import { BodyPartGauge } from "../../../../domain/entities/BodyPartGauge"
import { LogRepository } from "../../../../domain/repositories/LogRepository"
import { BodyPartGaugeRepository } from "../../../../domain/repositories/BodyPartGaugeRepository"
import { PrWorkoutRepository } from "../../../../infrastructure/repositories/PrWorkoutRepository"
import { PrLogWorkoutRepository } from "../../../../infrastructure/repositories/PrLogWorkoutRepository"
import { CreateLogRequestDto } from "../dtos/CreateLogRequestDto"
import { CreateLogResponseDto } from "../dtos/CreateLogResponseDto"
import { BodyPartGaugeCalculator } from "../services/BodyPartGaugeCalculator"

export class CreateLogUsecase {
  private bodyPartGaugeCalculator: BodyPartGaugeCalculator

  constructor(
    private logRepository: LogRepository,
    private workoutRepository: PrWorkoutRepository,
    private logWorkoutRepository: PrLogWorkoutRepository,
    private bodyPartGaugeRepository: BodyPartGaugeRepository
  ) {
    this.bodyPartGaugeCalculator = new BodyPartGaugeCalculator()
  }

  async execute(request: CreateLogRequestDto): Promise<CreateLogResponseDto> {
    try {
      const log = new Log(
        0,
        request.userId,
        request.calIconType,
        request.totalDuration,
        request.createdAt || new Date()
      )

      const savedLog = await this.logRepository.save(log)

      const workouts = request.workouts.map(
        (workout) =>
          new Workout(
            0,
            workout.seq,
            workout.exerciseName,
            workout.setCount,
            workout.weight,
            workout.repetitionCount,
            workout.distance,
            workout.durationSeconds
          )
      )

      const savedWorkouts = await this.workoutRepository.saveMany(workouts)

      const logWorkouts = savedWorkouts.map((workout) => ({
        logId: savedLog.id,
        workoutId: workout.id,
      }))

      const logWorkoutResult =
        await this.logWorkoutRepository.saveMany(logWorkouts)

      if (logWorkoutResult.count !== savedWorkouts.length) {
        return {
          success: false,
          message: "운동 로그 연결 중 일부 실패가 발생했습니다.",
        }
      }

      // 최신 body part gauge 데이터 조회
      const latestGauge =
        await this.bodyPartGaugeRepository.findLatestOneByUserId(request.userId)

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

      // 새로운 운동으로 인한 게이지 증가 계산 (부위별 레벨 적용)
      const gaugeUpdate = this.bodyPartGaugeCalculator.calculateGaugeUpdates(
        request.workouts,
        currentGauge
      )

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

      return {
        success: true,
        message: "운동 로그가 성공적으로 생성되었습니다.",
        logId: savedLog.id,
      }
    } catch (error) {
      return {
        success: false,
        message: "운동 로그 생성 중 오류가 발생했습니다.",
      }
    }
  }
}
