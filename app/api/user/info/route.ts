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

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ message: "error" }, { status: 401 })
  }

  const body = await req.json()
  const { nickName, height, weight, age, gender, characterColor, characterId } =
    body

  const usecase = new UpdateUserInfoUsecase(new PrUserRepository())

  // 클라이언트 필드 매핑: age(string)→number, gender(string)→Gender(enum)
  const ageNumber = age != null ? Number(age) : undefined
  const genderLower =
    typeof gender === "string" ? gender.toLowerCase() : undefined
  const genderEnum = processGender(genderLower || "none")

  const dto = new UpdateUserInfoDto(
    userId,
    undefined, // password 미변경
    nickName,
    height,
    weight,
    ageNumber,
    genderEnum,
    characterColor,
    characterId
  )

  try {
    await usecase.execute(dto)
    return NextResponse.json({ message: "success" })
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ message: "error" }, { status: 401 })
  }

  const usecase = new DeleteUserUsecase(new PrUserRepository())

  try {
    await usecase.execute({ userId })
    return NextResponse.json({ message: "success" })
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}
export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ message: "error" }, { status: 401 })
  }

  const usecase = new GetUserInfoUsecase(new PrUserRepository())
  const result = await usecase.execute({ userId })

  if (!result) {
    return NextResponse.json({ message: "error" }, { status: 404 })
  }

  return NextResponse.json(result)
}
