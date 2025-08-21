import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { DeleteLogRequestDto } from "@/backend/application/user/logs/dtos/DeleteLogRequestDto"
import { DeleteLogResponseDto } from "@/backend/application/user/logs/dtos/DeleteLogResponseDto"
import { BodyPartGaugeRepository } from "@/backend/domain/repositories/BodyPartGaugeRepository"
import { BodyPartGauge } from "@/backend/domain/entities/BodyPartGauge"
import { BadgeDeletionService } from "@/backend/application/user/logs/services/BadgeDeletionService"
import { TransactionManager } from "@/backend/domain/repositories/TransactionManager"

export class DeleteLogUsecase {
  constructor(
    private transactionManager: TransactionManager,
    private logRepository: LogRepository,
    private bodyPartGaugeRepository: BodyPartGaugeRepository,
    private badgeDeletionService: BadgeDeletionService
  ) {}

  async execute(request: DeleteLogRequestDto): Promise<DeleteLogResponseDto> {
    try {
      return await this.transactionManager.executeInTransaction(async (tx) => {
        const logToDelete = await this.logRepository.findById(request.logId, false, tx)

        if (!logToDelete) {
          return {
            success: false,
            message: "삭제할 운동 로그를 찾을 수 없습니다.",
          }
        }

        // 로그 삭제
        const deleteSuccess = await this.logRepository.delete(request.logId, tx)

        if (!deleteSuccess) {
          return {
            success: false,
            message: "운동 로그 삭제에 실패했습니다.",
          }
        }

        await this.badgeDeletionService.handleBadgeDeletion(logToDelete, tx)

        // 현재 최신 bodypart gague 조회
        const latestGauge =
          await this.bodyPartGaugeRepository.findLatestOneByUserId(
            logToDelete.userId,
            tx
          )

        if (!latestGauge) {
          return {
            success: false,
            message: "사용자의 게이지 정보를 찾을 수 없습니다.",
          }
        }

        // gaugeChanges에서 각 부위별 값을 감소시킨 새로운 body_part_gauge 생성
        const gaugeChanges = logToDelete.gaugeChanges || {}
        const newBodyPartGauge = new BodyPartGauge(
          latestGauge.userId,
          Math.max(0, latestGauge.arms - (gaugeChanges.arms || 0)),
          Math.max(0, latestGauge.legs - (gaugeChanges.legs || 0)),
          Math.max(0, latestGauge.shoulders - (gaugeChanges.shoulders || 0)),
          Math.max(0, latestGauge.back - (gaugeChanges.back || 0)),
          Math.max(0, latestGauge.chest - (gaugeChanges.chest || 0)),
          Math.max(0, latestGauge.core - (gaugeChanges.core || 0)),
          Math.max(0, latestGauge.stamina - (gaugeChanges.stamina || 0)),
          new Date(),
          new Date()
        )

        // 새로운 body_part_gauge 저장
        await this.bodyPartGaugeRepository.save(newBodyPartGauge, tx)

        return {
          success: true,
          message: "운동 로그가 성공적으로 삭제되었습니다.",
        }
      })
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "운동 로그 삭제 중 오류가 발생했습니다.",
      }
    }
  }
}
