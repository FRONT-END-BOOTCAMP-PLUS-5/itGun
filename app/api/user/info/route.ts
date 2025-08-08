import { DeleteUserUsecase } from "@/backend/application/user/info/usecases/DeleteUserUsecase"
import { UpdateUserInfoUsecase } from "@/backend/application/user/info/usecases/UpdateUserInfoUsecase"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { user } = body

    if (!user || !user.userId) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const usecase = new UpdateUserInfoUsecase(new PrUserRepository())
    await usecase.execute(user)

    return NextResponse.json({ message: "success" })
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const usecase = new DeleteUserUsecase(new PrUserRepository())
    await usecase.execute(userId)

    return NextResponse.json({ message: "success" })
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}
