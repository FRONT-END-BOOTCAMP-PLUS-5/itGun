import { DeleteUserUsecase } from "@/backend/application/user/info/usecases/DeleteUserUsecase"
import { GetUserInfoUsecase } from "@/backend/application/user/info/usecases/GetUserInfoUsecase"
import { UpdateUserInfoUsecase } from "@/backend/application/user/info/usecases/UpdateUserInfoUsecase"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { UpdateUserInfoDto } from "@/backend/application/user/info/dtos/UpdateUserInfoDto"
import { Gender } from "@/backend/domain/entities/User"

// 제네릭을 사용한 Gender 처리 함수
function processGender<T extends string>(gender: T): Gender {
  if (gender === "male" || gender === "female" || gender === "none") {
    if (gender === "male") return Gender.MALE
    if (gender === "female") return Gender.FEMALE
    return Gender.NONE
  }
  return Gender.NONE
}

export async function GET() {
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
    console.error("GET /api/user/info error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { user } = body

    // 세션에서 userId 확보
    const session = await getServerSession(authOptions)
    const sessionUserId = session?.user?.id

    if (!user || !sessionUserId) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const usecase = new UpdateUserInfoUsecase(new PrUserRepository())

    // 클라이언트 필드 매핑: nickname→nickName, age(string)→number, gender(string)→Gender(enum)
    const ageNumber = user.age != null ? Number(user.age) : undefined
    const genderLower =
      typeof user.gender === "string" ? user.gender.toLowerCase() : undefined
    const genderEnum = processGender(genderLower || "none")

    const dto = new UpdateUserInfoDto(
      sessionUserId,
      undefined, // password 미변경
      user.nickname,
      user.height,
      user.weight,
      ageNumber,
      genderEnum,
      user.characterColor,
      user.characterId
    )

    await usecase.execute(dto)

    return NextResponse.json({ message: "success" })
  } catch (error) {
    console.error("PUT /api/user/info error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const usecase = new DeleteUserUsecase(new PrUserRepository())
    await usecase.execute({ userId })

    return NextResponse.json({ message: "success" })
  } catch (error) {
    console.error("DELETE /api/user/info error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
