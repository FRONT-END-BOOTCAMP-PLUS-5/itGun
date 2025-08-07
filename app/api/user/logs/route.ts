import { NextRequest, NextResponse } from "next/server"
import { CreateLogUsecase } from "../../../../backend/application/user/logs/usecases/CreateLogUsecase"
import { PrLogRepository } from "../../../../backend/infrastructure/repositories/PrLogRepository"
import { PrWorkoutRepository } from "../../../../backend/infrastructure/repositories/PrWorkoutRepository"
import { PrLogWorkoutRepository } from "../../../../backend/infrastructure/repositories/PrLogWorkoutRepository"
import { PrBodyPartGaugeRepository } from "../../../../backend/infrastructure/repositories/PrBodyPartGaugeRepository"
import { CreateLogRequestDto } from "../../../../backend/application/user/logs/dtos/CreateLogRequestDto"

export async function POST(request: NextRequest) {
  try {
    const body: CreateLogRequestDto = await request.json()

    const logRepository = new PrLogRepository()
    const workoutRepository = new PrWorkoutRepository()
    const logWorkoutRepository = new PrLogWorkoutRepository()
    const bodyPartGaugeRepository = new PrBodyPartGaugeRepository()

    const createLogUsecase = new CreateLogUsecase(
      logRepository,
      workoutRepository,
      logWorkoutRepository,
      bodyPartGaugeRepository,
    )

    const result = await createLogUsecase.execute(body)

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "log creation failed",
      },
      { status: 500 },
    )
  }
}
