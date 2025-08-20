import { Log } from "@/backend/domain/entities/Log"
import { LogWorkout } from "@/backend/domain/entities/LogWorkout"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { LogDto } from "@/backend/application/user/logs/dtos/GetLogDto"
import { GetLogRequestDto } from "@/backend/application/user/logs/dtos/GetLogRequestDto"
import { GetLogResponseDto } from "@/backend/application/user/logs/dtos/GetLogResponseDto"
import { WorkoutDto } from "@/backend/application/user/logs/dtos/GetWorkoutDto"

export class GetLogUsecase {
  constructor(private readonly logRepository: LogRepository) {}

  async execute(request: GetLogRequestDto): Promise<GetLogResponseDto> {
    try {
      const log = await this.logRepository.findById(request.logId, true)

      if (!log) {
        return {
          success: false,
          message: "로그를 찾을 수 없습니다."
        }
      }

      const logDto: LogDto = {
        id: log.id,
        userId: log.userId,
        calIconType: log.calIconType,
        logDate: log.logDate,
        totalDuration: log.totalDuration,
        gaugeChanges: log.gaugeChanges,
        workouts: this.mapWorkouts(log),
      }

      return {
        success: true,
        message: "로그를 성공적으로 조회했습니다.",
        log: logDto
      }
    } catch (error) {
      return {
        success: false,
        message: "로그 조회 중 오류가 발생했습니다."
      }
    }
  }

  private mapWorkouts(log: Log): WorkoutDto[] {
    if (!log.logWorkouts) return []

    const workouts = log.logWorkouts.map((logWorkout: LogWorkout) => ({
      id: logWorkout.workout!.id,
      seq: logWorkout.workout!.seq,
      exerciseName: logWorkout.workout!.exerciseName,
      setCount: logWorkout.workout!.setCount,
      weight: logWorkout.workout!.weight,
      repetitionCount: logWorkout.workout!.repetitionCount,
      distance: logWorkout.workout!.distance,
      durationSeconds: logWorkout.workout!.durationSeconds,
    }))

    // seq 우선, seq가 같으면 setCount로 정렬
    workouts.sort((a, b) => {
      if (a.seq !== b.seq) {
        return a.seq - b.seq
      }
      return a.setCount - b.setCount
    })

    return workouts;
  }
}
