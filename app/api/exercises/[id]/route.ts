import { GetExerciseDetailUsecase } from "@/backend/application/exercises/usecases/GetExerciseDetailUsecase"
import { PrExerciseRepository } from "@/backend/infrastructure/repositories/PrExerciseRepository"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const usecase = new GetExerciseDetailUsecase(new PrExerciseRepository())

  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 })
    }
    const result = await usecase.execute(id)

    if (!result) {
      return NextResponse.json(
        { message: "Exercise not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "exercise retrieval failed"
    )
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}
