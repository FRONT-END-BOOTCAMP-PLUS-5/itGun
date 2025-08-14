import { ExerciseRepository } from "@/backend/domain/repositories/ExerciseRepository"
import prisma from "../../../utils/prisma"
import { Exercise } from "@/backend/domain/entities/Exercise"

export class PrExerciseRepository implements ExerciseRepository {
  async find(options: {
    page: number
    limit: number
    keywords?: string[]
    bodyParts?: string[]
    equipments?: string[]
  }): Promise<{ exercises: Exercise[]; total: number } | null> {
    const { page, limit, keywords, bodyParts, equipments } = options

    const where: any = {}
    if (keywords && keywords.length > 0) {
      where.keywords = { hasSome: keywords }
    }
    if (bodyParts && bodyParts.length > 0) {
      where.bodyParts = { hasSome: bodyParts }
    }
    if (equipments && equipments.length > 0) {
      where.equipments = { hasSome: equipments }
    }

    const total = await prisma.exercise.count({ where })
    const exercisesData = await prisma.exercise.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    })

    const exercises = exercisesData.map(this.toDomain)

    return { exercises, total }
  }

  private toDomain(exercise: any): Exercise {
    return new Exercise(
      exercise.id,
      exercise.name,
      exercise.nameKo,
      exercise.imageUrl,
      exercise.videoUrl,
      exercise.equipments,
      exercise.equipmentsKo,
      exercise.bodyParts,
      exercise.bodyPartsKo,
      exercise.exerciseType,
      exercise.keywords,
      exercise.keywordsKo,
      exercise.overview,
      exercise.overviewKo,
      exercise.instructions,
      exercise.instructionsKo,
      exercise.exerciseTips,
      exercise.exerciseTipsKo,
      exercise.variations,
      exercise.relatedExerciseIds
    )
  }
}
