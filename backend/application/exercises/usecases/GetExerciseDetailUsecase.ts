import { ExerciseRepository } from "@/backend/domain/repositories/ExerciseRepository"

export class GetExerciseDetailUsecase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute(id: string) {
    try {
      const exercise = await this.exerciseRepository.findById(id)
      if (!exercise) {
        throw new Error("해당 운동을 찾을 수 없습니다")
      }
      return exercise
    } catch (e) {
      console.error(e)
      throw new Error("운동 상세 정보를 가져오는 중 오류가 발생했습니다")
    }
  }
}
