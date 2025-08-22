import { PostUserGaugeRequestDto } from "@/backend/application/user/gauges/dtos/PostUserGaugeRequestDto"
import { PostUserGaugeUsecase } from "@/backend/application/user/gauges/usecases/PostUserGaugeUsecase"
import { PrBodyPartGaugeRepository } from "@/backend/infrastructure/repositories/PrBodyPartGaugeRepository"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/auth"
import { GetUserGaugeRequestDto } from "@/backend/application/user/gauges/dtos/GetUserGaugeRequestDto"
import { GetUserGaugeUsecase } from "@/backend/application/user/gauges/usecases/GetUserGaugeUsecase"

// POST /api/user/gauges
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ message: "error" }, { status: 401 })
  }
  const usecase = new PostUserGaugeUsecase(new PrBodyPartGaugeRepository())
  const requestDto = new PostUserGaugeRequestDto(userId)

  try {
    const result = await usecase.execute(requestDto)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}

// GET /api/user/gauges
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ message: "error" }, { status: 401 })
  }

  const usecase = new GetUserGaugeUsecase(new PrBodyPartGaugeRepository())
  const queryDto = new GetUserGaugeRequestDto(userId)
  const result = await usecase.execute(queryDto)

  return NextResponse.json(result)
}
