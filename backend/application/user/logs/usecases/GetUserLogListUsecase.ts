import { Log } from "@/backend/domain/entities/Log"
import { LogWorkout } from "@/backend/domain/entities/LogWorkout"
import { LogRepository } from "../../../../domain/repositories/LogRepository"
import { LogDto } from "../dtos/GetLogDto"
import { GetUserLogsQueryDto } from "../dtos/GetUserLogsQueryDto"
import { GetUserLogsRequestDto } from "../dtos/GetUserLogsRequestDto"
import { GetUserLogsResponseDto } from "../dtos/GetUserLogsResponseDto"
import { WorkoutDto } from "../dtos/GetWorkoutDto"

export class GetUserLogListUsecase {
  constructor(private readonly logRepository: LogRepository) {}

  async execute(
    request: GetUserLogsRequestDto,
    query: GetUserLogsQueryDto
  ): Promise<GetUserLogsResponseDto> {
    const logs = await this.logRepository.findAllByUserIdAndMonth(
      request.userId,
      query.year,
      query.month
    )

    const logDtos: LogDto[] = logs.map((log) => ({
      id: log.id,
      calIconType: log.calIconType,
      createdAt: log.createdAt.toISOString(),
      totalDuration: log.totalDuration,
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
