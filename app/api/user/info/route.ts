import { NextRequest, NextResponse } from "next/server"
import { GetUserInfoUsecase } from "@/backend/application/user/info/usecases/GetUserInfoUsecase"
import { UpdateUserInfoUsecase } from "@/backend/application/user/info/usecases/UpdateUserInfoUsecase"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { UpdateUserInfoDto } from "@/backend/application/user/info/dtos/UpdateUserInfoDto"

// GET /api/user/info?userId=xxx
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }
    const usecase = new GetUserInfoUsecase(new PrUserRepository())
    const result = await usecase.execute({ userId })
    if (!result) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

// PUT /api/user/info
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, password, nickName, height, weight, age, gender, characterColor, characterId } = body
    if (!id) {
      return NextResponse.json({ error: "id(userId)가 필요합니다." }, { status: 400 })
    }
    const usecase = new UpdateUserInfoUsecase(new PrUserRepository())
    const dto = new UpdateUserInfoDto(
      id,
      password,
      nickName,
      height,
      weight,
      age,
      gender,
      characterColor,
      characterId
    )
    await usecase.execute(dto)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
