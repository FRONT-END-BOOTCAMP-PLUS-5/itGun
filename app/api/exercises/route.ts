import { GetExerciseListQueryDto } from "@/backend/application/exercises/dtos/GetExerciseListQueryDto"
import { GetExerciseListUsecase } from "@/backend/application/exercises/usecases/GetExerciseListUsecase"
import { NextRequest, NextResponse } from "next/server"

// GET /api/exercises?q=&bodyPart=&equipment=
// q, bodyPart, equipment가 각각 여러 개 가능인데
// -> chest workout,barbell 이렇게 두개가 넣고 싶으면
// => chest+workout%2Cbarbell 이런 형식으로 보내야 합니다.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")
  const bodyPart = searchParams.get("bodyPart")
  const equipment = searchParams.get("equipment")

  const usecase = new GetExerciseListUsecase()
  const queryDto = new GetExerciseListQueryDto(q, bodyPart, equipment)

  try {
    const result = await usecase.execute(queryDto)

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}
