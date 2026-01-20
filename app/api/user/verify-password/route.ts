import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { PostUserPasswordUsecase } from "@/backend/application/user/verify-password/usecases/PostUserPasswordUsecase"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { PostUserPasswordRequestDto } from "@/backend/application/user/verify-password/dtos/PostUserPasswordRequestDto"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: "비밀번호를 입력해주세요." },
        { status: 400 }
      )
    }

    const usecase = new PostUserPasswordUsecase(new PrUserRepository())
    const currentPassword = await usecase.execute(
      new PostUserPasswordRequestDto(userId)
    )

    if (!currentPassword) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { valid: password === currentPassword },
      { status: 200 }
    )
  } catch (error) {
    console.error("비밀번호 확인 오류:", error)
    return NextResponse.json({ error: "오류가 발생했습니다." }, { status: 500 })
  }
}
