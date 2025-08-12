import { NextRequest, NextResponse } from "next/server"
import { CreateLogUsecase } from "@/backend/application/user/logs/usecases/CreateLogUsecase"
import { PrLogRepository } from "@/backend/infrastructure/repositories/PrLogRepository"
import { PrWorkoutRepository } from "@/backend/infrastructure/repositories/PrWorkoutRepository"
import { PrLogWorkoutRepository } from "@/backend/infrastructure/repositories/PrLogWorkoutRepository"
import { PrBodyPartGaugeRepository } from "@/backend/infrastructure/repositories/PrBodyPartGaugeRepository"
import { PrBadgeRepository } from "@/backend/infrastructure/repositories/PrBadgeRepository"
import { PrUserBadgeRepository } from "@/backend/infrastructure/repositories/PrUserBadgeRepository"
import { PrUserRecordRepository } from "@/backend/infrastructure/repositories/PrUserRecordRepository"
import { CreateLogRequestDto } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { GetUserLogsQueryDto } from "@/backend/application/user/logs/dtos/GetUserLogsQueryDto"
import { GetUserLogsRequestDto } from "@/backend/application/user/logs/dtos/GetUserLogsRequestDto"
import { GetUserLogListUsecase } from "@/backend/application/user/logs/usecases/GetUserLogListUsecase"

export async function GET(req: NextRequest) {
  const { userId }: GetUserLogsRequestDto = await req.json()
  const { searchParams } = new URL(req.url)
  const year = Number(searchParams.get("year"))
  const month = Number(searchParams.get("month"))

  if (!year || !month) {
    return NextResponse.json({ message: "error" }, { status: 400 })
  }

  if (!userId) {
    return NextResponse.json({ message: "error" }, { status: 400 })
  }

  const usecase = new GetUserLogListUsecase(new PrLogRepository())
  const requestDto: GetUserLogsRequestDto = { userId }
  const queryDto: GetUserLogsQueryDto = { year, month }

  if (isNaN(queryDto.year) || isNaN(queryDto.month)) {
    return NextResponse.json({ message: "error" }, { status: 400 })
  }

  try {
    const result = await usecase.execute(requestDto, queryDto)

    if (result.success) {
      return NextResponse.json(
        { message: "success", logs: result.logs },
        { status: 200 }
      )
    } else {
      return NextResponse.json({ message: "error" }, { status: 400 })
    }
  } catch (error) {
    console.log(error instanceof Error ? error.message : "Failed to fetch logs")
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateLogRequestDto = await request.json()

    const logRepository = new PrLogRepository()
    const workoutRepository = new PrWorkoutRepository()
    const logWorkoutRepository = new PrLogWorkoutRepository()
    const bodyPartGaugeRepository = new PrBodyPartGaugeRepository()
    const badgeRepository = new PrBadgeRepository()
    const userBadgeRepository = new PrUserBadgeRepository()
    const userRecordRepository = new PrUserRecordRepository()

    const createLogUsecase = new CreateLogUsecase(
      logRepository,
      workoutRepository,
      logWorkoutRepository,
      bodyPartGaugeRepository,
      badgeRepository,
      userBadgeRepository,
      userRecordRepository
    )

    const result = await createLogUsecase.execute(body)

    if (result.success) {
      return NextResponse.json(
        { 
          message: "success", 
          logId: result.logId,
          awardedBadges: result.awardedBadges || []
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json({ message: "error" }, { status: 400 })
    }
  } catch (error) {
    console.log(error instanceof Error ? error.message : "log creation failed")
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}
