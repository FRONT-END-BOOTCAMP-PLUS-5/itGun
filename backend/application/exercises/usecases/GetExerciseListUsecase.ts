import { Exercise } from "@/backend/domain/entities/Exercise"
import {
  ExerciseDto,
  GetExerciseListReponseDto,
} from "../dtos/GetExerciseListReponseDto"
import { GetExerciseListQueryDto } from "../dtos/GetExerciseListQueryDto"
import { ExerciseRepository } from "@/backend/domain/repositories/ExerciseRepository"
import { GetExerciseListRequestDto } from "../dtos/GetExerciseListRequestDto"

export class GetExerciseListUsecase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute(
    query: GetExerciseListQueryDto,
    request: GetExerciseListRequestDto
  ): Promise<GetExerciseListReponseDto> {
    try {
      const page = request.page || 1
      const limit = request.limit || 10

      const bodyParts: string[] | undefined = query.bodyPart
        ?.replace("+", " ")
        .split("%2")
      const equipments: string[] | undefined = query.equipment
        ?.replace("+", " ")
        .split("%2")
      const keywords: string[] | undefined = query.q
        ?.replace("+", " ")
        .split("%2")

      const result = await this.exerciseRepository.find({
        page,
        limit,
        bodyParts,
        equipments,
        keywords,
      })

      if (!result) {
        return new GetExerciseListReponseDto([])
      }

      const { exercises, total } = result

      return new GetExerciseListReponseDto(exercises.map(this.toDto), {
        total,
        page,
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      })
    } catch (e) {
      console.error(e)
      throw new Error("운동 목록을 가져오는 중 에러가 발생했습니다.")
    }
  }

  private toDto(exercise: Exercise): ExerciseDto {
    return new ExerciseDto(
      exercise.id,
      exercise.nameKo,
      exercise.imageUrl,
      exercise.videoUrl,
      exercise.equipmentsKo,
      exercise.bodyPartsKo,
      exercise.exerciseType,
      exercise.keywordsKo,
      exercise.overviewKo,
      exercise.instructionsKo,
      exercise.exerciseTipsKo,
      exercise.variations,
      exercise.relatedExerciseIds
    )
  }
}
