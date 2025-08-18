import { CheckEmailUsecase } from "@/backend/application/user/email/usecases/CheckEmailUsecase"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    const usecase = new CheckEmailUsecase(new PrUserRepository())
    const result = await usecase.execute({ email })

    if (result.status !== 200) {
      return NextResponse.json(
        {
          error: result.message,
          isAvailable: result.isAvailable,
        },
        { status: result.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      isAvailable: result.isAvailable,
    })
  } catch (error) {
    console.error("Email check error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
