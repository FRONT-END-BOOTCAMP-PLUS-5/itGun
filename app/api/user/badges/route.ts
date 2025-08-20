import { GetUserBadgeListQueryDto } from "@/backend/application/user/badges/dtos/GetUserBadgeListQueryDto"
import { GetUserBadgeListUsecase } from "@/backend/application/user/badges/usecases/GetUserBadgeListUsecase"
import { PrBadgeRepository } from "@/backend/infrastructure/repositories/PrBadgeRepository"
import { PrUserBadgeRepository } from "@/backend/infrastructure/repositories/PrUserBadgeRepository"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/auth"

// GET /api/user/badges?limit=갯수&period=기간
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ message: "error" }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get("limit"))
  const period = Number(searchParams.get("period"))

  const usecase = new GetUserBadgeListUsecase(
    new PrBadgeRepository(),
    new PrUserBadgeRepository()
  )
  const queryDto = new GetUserBadgeListQueryDto(userId, limit, period)

  const result = await usecase.execute(queryDto)

  return NextResponse.json(result)
}
