import { Log } from "../../../../domain/entities/Log"
import { Workout } from "../../../../domain/entities/Workout"
import { LogRepository } from "../../../../domain/repositories/LogRepository"
import { PrWorkoutRepository } from "../../../../infrastructure/repositories/PrWorkoutRepository"
import { PrLogWorkoutRepository } from "../../../../infrastructure/repositories/PrLogWorkoutRepository"
import { CreateLogRequestDto } from "../dtos/CreateLogRequestDto"
import { CreateLogResponseDto } from "../dtos/CreateLogResponseDto"

export class CreateLogUsecase {
  constructor(
    private logRepository: LogRepository,
    private workoutRepository: PrWorkoutRepository,
    private logWorkoutRepository: PrLogWorkoutRepository,
  ) {}

  async execute(request: CreateLogRequestDto): Promise<CreateLogResponseDto> {
    try {
      const log = new Log(
        0,
        request.user_id,
        request.cal_icon_type,
        request.total_duration,
        request.created_at || new Date(),
      )

      const savedLog = await this.logRepository.save(log)

      const workouts = request.workouts.map(
        (workout) =>
          new Workout(
            0,
            workout.seq,
            workout.exercise_name,
            workout.set_count,
            workout.weight,
            workout.repetition_count,
            workout.distance,
            workout.duration_seconds,
          ),
      )

      const savedWorkouts = await this.workoutRepository.saveMany(workouts)

      const logWorkouts = savedWorkouts.map((workout) => ({
        logId: savedLog.id,
        workoutId: workout.id,
      }))

      const logWorkoutResult = await this.logWorkoutRepository.saveMany(logWorkouts)

      if (logWorkoutResult.count !== savedWorkouts.length) {
        return {
          success: false,
          message: "운동 로그 연결 중 일부 실패가 발생했습니다.",
        }
      }

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
