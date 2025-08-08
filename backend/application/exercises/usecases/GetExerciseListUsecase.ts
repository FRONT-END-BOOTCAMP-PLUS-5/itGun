import { ExerciseApiResponse } from "../dtos/ExerciseApiResponse"
import { ExerciseDto, GetExerciseListDto } from "../dtos/GetExerciseListDto"
import { GetExerciseListQueryDto } from "../dtos/GetExerciseListQueryDto"

const EXERCISE_API_URL = "https://v2.exercisedb.dev/api/v1/exercises"

export class GetExerciseListUsecase {
  constructor() {}
  async execute(query: GetExerciseListQueryDto): Promise<GetExerciseListDto> {
    let url = `${EXERCISE_API_URL}?limit=10`

    if (query.q) {
      url += `&keywords=${query.q}`
      url += `&name=${query.q}`
    }
    if (query.bodyPart) {
      url += `&bodyParts=${query.bodyPart}`
    }
    if (query.equipment) {
      url += `&equipments=${query.equipment}`
    }

    try {
      const response = await fetch(url)
      const data: ExerciseApiResponse = await response.json()
      let exerciseDtos: ExerciseDto[] = []
      if (data.success) {
        exerciseDtos = data.data.map(
          (exercise) =>
            new ExerciseDto(
              exercise.exerciseId,
              exercise.name,
              exercise.imageUrl,
              exercise.videoUrl,
              exercise.bodyParts,
              exercise.equipments,
              exercise.instructions,
              exercise.exerciseTips
            )
        )
      }

      return new GetExerciseListDto(exerciseDtos, data.meta)
    } catch {
      return new GetExerciseListDto([])
    }
  }
}
