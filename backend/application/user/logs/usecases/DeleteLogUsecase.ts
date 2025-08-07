import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { DeleteLogRequestDto } from "@/backend/application/user/logs/dtos/DeleteLogRequestDto"
import { DeleteLogResponseDto } from "@/backend/application/user/logs/dtos/DeleteLogResponseDto"

export class DeleteLogUsecase {
  constructor(private logRepository: LogRepository) {}

  async execute(request: DeleteLogRequestDto): Promise<DeleteLogResponseDto> {
    try {
      const success = await this.logRepository.delete(request.logId)
      
      if (success) {
        return {
          success: true,
          message: "운동 로그가 성공적으로 삭제되었습니다.",
        }
      } else {
        return {
          success: false,
          message: "삭제할 운동 로그를 찾을 수 없습니다.",
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "운동 로그 삭제 중 오류가 발생했습니다.",
      }
    }
  }
}
