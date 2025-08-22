import { NextRequest, NextResponse } from "next/server"
import { CreateLogUsecase } from "@/backend/application/user/logs/usecases/CreateLogUsecase"
import { PrLogRepository } from "@/backend/infrastructure/repositories/PrLogRepository"
import { PrWorkoutRepository } from "@/backend/infrastructure/repositories/PrWorkoutRepository"
import { PrBodyPartGaugeRepository } from "@/backend/infrastructure/repositories/PrBodyPartGaugeRepository"
import { PrBadgeRepository } from "@/backend/infrastructure/repositories/PrBadgeRepository"
import { PrUserBadgeRepository } from "@/backend/infrastructure/repositories/PrUserBadgeRepository"
import { PrBenchPressRecordRepository } from "@/backend/infrastructure/repositories/PrBenchPressRecordRepository"
import { PrSquatRecordRepository } from "@/backend/infrastructure/repositories/PrSquatRecordRepository"
import { PrDeadliftRecordRepository } from "@/backend/infrastructure/repositories/PrDeadliftRecordRepository"
import { PrRunningRecordRepository } from "@/backend/infrastructure/repositories/PrRunningRecordRepository"
import { PrBigThreeRecordRepository } from "@/backend/infrastructure/repositories/PrBigThreeRecordRepository"
import { PrTransactionManager } from "@/backend/infrastructure/repositories/PrTransactionManager"
import { CreateLogRequestDto } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { GetUserLogsQueryDto } from "@/backend/application/user/logs/dtos/GetUserLogsQueryDto"
import { GetUserLogsRequestDto } from "@/backend/application/user/logs/dtos/GetUserLogsRequestDto"
import { GetUserLogListUsecase } from "@/backend/application/user/logs/usecases/GetUserLogListUsecase"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/auth"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
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

    const transactionManager = new PrTransactionManager()
    const logRepository = new PrLogRepository()
    const workoutRepository = new PrWorkoutRepository()
    const bodyPartGaugeRepository = new PrBodyPartGaugeRepository()
    const badgeRepository = new PrBadgeRepository()
    const userBadgeRepository = new PrUserBadgeRepository()
    const benchPressRecordRepository = new PrBenchPressRecordRepository()
    const squatRecordRepository = new PrSquatRecordRepository()
    const deadliftRecordRepository = new PrDeadliftRecordRepository()
    const runningRecordRepository = new PrRunningRecordRepository()
    const bigThreeRecordRepository = new PrBigThreeRecordRepository()
    const createLogUsecase = new CreateLogUsecase(
      transactionManager,
      logRepository,
      workoutRepository,
      bodyPartGaugeRepository,
      badgeRepository,
      userBadgeRepository,
      benchPressRecordRepository,
      squatRecordRepository,
      deadliftRecordRepository,
      runningRecordRepository,
      bigThreeRecordRepository
    )

    const result = await createLogUsecase.execute(body)

    if (result.success) {
      return NextResponse.json(
        {
          message: "success",
          logId: result.logId,
          awardedBadges: result.awardedBadges || [],
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
