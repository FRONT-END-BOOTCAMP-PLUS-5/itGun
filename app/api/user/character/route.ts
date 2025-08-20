import { GetUserCharacterQueryDto } from "@/backend/application/user/character/dtos/GetUserCharacterQueryDto"
import { GetUserCharacterUsecase } from "@/backend/application/user/character/usecases/GetUserCharacterUsecase"
import { PrBodyPartGaugeRepository } from "@/backend/infrastructure/repositories/PrBodyPartGaugeRepository"
import { PrCharacterAssetRepository } from "@/backend/infrastructure/repositories/PrCharacterAssetRepository"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

// GET /api/user/character?date=
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ message: "error" }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")

  const usecase = new GetUserCharacterUsecase(
    new PrUserRepository(),
    new PrBodyPartGaugeRepository(),
    new PrCharacterAssetRepository()
  )
  const queryDto = new GetUserCharacterQueryDto(userId, date)
  const result = await usecase.execute(queryDto)

  return NextResponse.json(result)
}
