import { NextRequest, NextResponse } from "next/server"
import { GetUserInfoUsecase } from "@/backend/application/user/info/usecases/GetUserInfoUsecase"
import { UpdateUserInfoUsecase } from "@/backend/application/user/info/usecases/UpdateUserInfoUsecase"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { UpdateUserInfoDto } from "@/backend/application/user/info/dtos/UpdateUserInfoDto"

// GET /api/user/info?userId=xxx
export async function GET(req: NextRequest) {
  try {
<<<<<<< HEAD
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
=======
    const body = await req.json()
    const userId = body.userId
>>>>>>> ca37f51 (fix: #5 회원 정보 조회  api 코멘트 보고 수정)
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
<<<<<<< HEAD

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
=======
                                                                                                                                                                                                                                                                                                                                                                                                                        
>>>>>>> ca37f51 (fix: #5 회원 정보 조회  api 코멘트 보고 수정)
