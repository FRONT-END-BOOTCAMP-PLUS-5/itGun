import { PostUserGaugeQueryDto } from "@/backend/application/user/gauges/dtos/PostUserGaugeQueryDto"
import { PostUserGaugeUsecase } from "@/backend/application/user/gauges/usecases/PostUserGaugeUsecase"
import { PrBodyPartGaugeRepository } from "@/backend/infrastructure/repositories/PrBodyPartGaugeRepository"
import { NextRequest, NextResponse } from "next/server"

// POST /api/user/gauges
export async function POST(req: NextRequest) {
  const { userId } = await req.json()
  const usecase = new PostUserGaugeUsecase(new PrBodyPartGaugeRepository())
  const queryDto = new PostUserGaugeQueryDto(userId)

  try {
    const result = await usecase.execute(queryDto)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}
