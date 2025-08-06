import { NextRequest, NextResponse } from "next/server"
import { CreateAuthDto } from "@/backend/application/signup/dtos/CreateAuthDto"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { CreateUserUsecase } from "@/backend/application/signup/usecases/CreateUserUsecase"

export async function POST(req: NextRequest) {
  try {
    const body: CreateAuthDto = await req.json()

    // UseCase 인스턴스 생성
    const userRepository = new PrUserRepository()
    const createUserUsecase = new CreateUserUsecase(userRepository)

    // UseCase 실행
    const result = await createUserUsecase.execute(body)

    return NextResponse.json(result, { status: result.status })
  } catch (error) {
    console.error("Signup API Error", error)
    return NextResponse.json(
      {
        message: "서버 오류",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello, World!" })
}
