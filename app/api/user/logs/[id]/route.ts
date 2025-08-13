import { NextRequest, NextResponse } from "next/server"
import { DeleteLogUsecase } from "@/backend/application/user/logs/usecases/DeleteLogUsecase"
import { PrLogRepository } from "@/backend/infrastructure/repositories/PrLogRepository"
import { DeleteLogRequestDto } from "@/backend/application/user/logs/dtos/DeleteLogRequestDto"
import { PrBodyPartGaugeRepository } from "@/backend/infrastructure/repositories/PrBodyPartGaugeRepository"

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
    const deleteLogUsecase = new DeleteLogUsecase(logRepository, bodyPartGaugeRepository)

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
