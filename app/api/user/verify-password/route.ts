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
    const { password } = await request.json()
    if (!userId || !password) {
      return NextResponse.json({ error: "잘못된 접근입니다." }, { status: 400 })
    }

    const usecase = new PostUserPasswordUsecase(new PrUserRepository())
    const verifyPassword = await usecase.execute(
      new PostUserPasswordRequestDto(userId, password)
    )

    return NextResponse.json(verifyPassword, { status: 200 })
  } catch (error) {
    console.error("비밀번호 확인 오류:", error)
    return NextResponse.json({ error: "오류가 발생했습니다." }, { status: 500 })
  }
}
