import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { LogDto } from "@/backend/application/user/logs/dtos/GetLogDto"
import { GetUserLogsQueryDto } from "@/backend/application/user/logs/dtos/GetUserLogsQueryDto"
import { GetUserLogsRequestDto } from "@/backend/application/user/logs/dtos/GetUserLogsRequestDto"
import { GetUserLogsResponseDto } from "@/backend/application/user/logs/dtos/GetUserLogsResponseDto"

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
      false
    )

    const logDtos: LogDto[] = logs.map((log) => ({
      id: log.id,
      userId: log.userId,
      calIconType: log.calIconType,
      logDate: log.logDate,
      createdAt: log.createdAt,
      totalDuration: log.totalDuration,
      gaugeChanges: log.gaugeChanges,
    }))

    return {
      success: true,
      message: "로그 목록을 성공적으로 조회했습니다.",
      logs: logDtos
    }
  }
}
