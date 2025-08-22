import { CheckEmailUsecase } from "@/backend/application/user/email/usecases/CheckEmailUsecase"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    const usecase = new CheckEmailUsecase(new PrUserRepository())
    const result = await usecase.execute({ email })

    return NextResponse.json(
      {
        status: result.status,
        message: result.message,
        isAvailable: result.isAvailable,
      },
      { status: result.status }
    )
  } catch (error) {
    console.error("Email check error:", error)
    return NextResponse.json(
      {
        status: 500,
        message: "Internal Server Error",
        isAvailable: false,
      },
      { status: 500 }
    )
  }
}
