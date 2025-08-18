import { NextRequest, NextResponse } from "next/server"
import { DeleteLogUsecase } from "@/backend/application/user/logs/usecases/DeleteLogUsecase"
import { PrLogRepository } from "@/backend/infrastructure/repositories/PrLogRepository"
import { DeleteLogRequestDto } from "@/backend/application/user/logs/dtos/DeleteLogRequestDto"
import { PrBodyPartGaugeRepository } from "@/backend/infrastructure/repositories/PrBodyPartGaugeRepository"
import { BadgeDeletionService } from "@/backend/application/user/logs/services/BadgeDeletionService"
import { PrBadgeRepository } from "@/backend/infrastructure/repositories/PrBadgeRepository"
import { PrUserBadgeRepository } from "@/backend/infrastructure/repositories/PrUserBadgeRepository"
import { PrBenchPressRecordRepository } from "@/backend/infrastructure/repositories/PrBenchPressRecordRepository"
import { PrDeadliftRecordRepository } from "@/backend/infrastructure/repositories/PrDeadliftRecordRepository"
import { PrSquatRecordRepository } from "@/backend/infrastructure/repositories/PrSquatRecordRepository"
import { PrRunningRecordRepository } from "@/backend/infrastructure/repositories/PrRunningRecordRepository"
import { PrBigThreeRecordRepository } from "@/backend/infrastructure/repositories/PrBigThreeRecordRepository"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const logId = parseInt(id, 10)

    if (isNaN(logId)) {
      return NextResponse.json({ message: "error" }, { status: 400 })
    }

    const logRepository = new PrLogRepository()
    const bodyPartGaugeRepository = new PrBodyPartGaugeRepository()
    const badgeRepository = new PrBadgeRepository()
    const userBadgeRepository = new PrUserBadgeRepository()
    const benchPressRecordRepository = new PrBenchPressRecordRepository()
    const deadliftRecordRepository = new PrDeadliftRecordRepository()
    const squatRecordRepository = new PrSquatRecordRepository()
    const runningRecordRepository = new PrRunningRecordRepository()
    const bigThreeRecordRepository = new PrBigThreeRecordRepository()
    const badgeDeletionService = new BadgeDeletionService(
      userBadgeRepository,
      badgeRepository,
      logRepository,
      benchPressRecordRepository,
      deadliftRecordRepository,
      squatRecordRepository,
      runningRecordRepository,
      bigThreeRecordRepository
    )
    const deleteLogUsecase = new DeleteLogUsecase(
      logRepository,
      bodyPartGaugeRepository,
      badgeDeletionService
    )

    const requestDto: DeleteLogRequestDto = { logId }
    const result = await deleteLogUsecase.execute(requestDto)

    if (result.success) {
      return NextResponse.json({ message: "success" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "error" }, { status: 400 })
    }
  } catch (error) {
    console.log(error instanceof Error ? error.message : "log deletion failed")
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}
