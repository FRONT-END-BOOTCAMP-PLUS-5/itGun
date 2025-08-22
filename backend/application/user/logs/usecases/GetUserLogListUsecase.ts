import { Log } from "@/backend/domain/entities/Log"
import { LogWorkout } from "@/backend/domain/entities/LogWorkout"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { LogDto } from "@/backend/application/user/logs/dtos/GetLogDto"
import { GetUserLogsQueryDto } from "@/backend/application/user/logs/dtos/GetUserLogsQueryDto"
import { GetUserLogsRequestDto } from "@/backend/application/user/logs/dtos/GetUserLogsRequestDto"
import { GetUserLogsResponseDto } from "@/backend/application/user/logs/dtos/GetUserLogsResponseDto"
import { WorkoutDto } from "@/backend/application/user/logs/dtos/GetWorkoutDto"

export class GetUserLogListUsecase {
  constructor(private readonly logRepository: LogRepository) {}

  async execute(
    request: GetUserLogsRequestDto,
    query: GetUserLogsQueryDto
  ): Promise<GetUserLogsResponseDto> {
    const startDate = new Date(query.year, query.month - 1, 1)
    const endDate = new Date(query.year, query.month, 0, 23, 59, 59, 999)
    
    const logs = await this.logRepository.findAllByUserIdAndDateRange(
      request.userId,
      startDate,
      endDate,
      true
    )

    const logDtos: LogDto[] = logs.map((log) => ({
      id: log.id,
      userId: log.userId,
      calIconType: log.calIconType,
      logDate: log.logDate,
      totalDuration: log.totalDuration,
      gaugeChanges: log.gaugeChanges,
      workouts: this.mapWorkouts(log),
    }))

    return {
      success: true,
      message: "로그 목록을 성공적으로 조회했습니다.",
      logs: logDtos
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
