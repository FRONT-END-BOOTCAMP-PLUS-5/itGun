import { DeleteUserUsecase } from "@/backend/application/user/info/usecases/DeleteUserUsecase"
import { GetUserInfoUsecase } from "@/backend/application/user/info/usecases/GetUserInfoUsecase"
import { UpdateUserInfoUsecase } from "@/backend/application/user/info/usecases/UpdateUserInfoUsecase"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/auth"
import { UpdateUserInfoDto } from "@/backend/application/user/info/dtos/UpdateUserInfoDto"
import { DeleteUserDto } from "@/backend/application/user/info/dtos/DeleteUserDto"

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const body = await request.json()
    const {
      password,
      nickName,
      height,
      weight,
      age,
      gender,
      characterColor,
      characterId,
    } = body

    const usecase = new UpdateUserInfoUsecase(new PrUserRepository())
    await usecase.execute(
      new UpdateUserInfoDto(
        userId,
        password ?? undefined,
        nickName,
        height ?? undefined,
        weight ?? undefined,
        age ?? undefined,
        gender ?? undefined,
        characterColor ?? undefined,
        characterId ?? undefined
      )
    )

    return NextResponse.json({ message: "success" })
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const usecase = new DeleteUserUsecase(new PrUserRepository())
    await usecase.execute(new DeleteUserDto(userId))

    return NextResponse.json({ message: "success" })
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
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
    return NextResponse.json({ error: "" }, { status: 500 })
  }
}
