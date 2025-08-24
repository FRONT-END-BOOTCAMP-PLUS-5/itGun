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
    let whereClause = "WHERE 1=1"
    const params: any[] = []
    let paramIndex = 1

    if (keywords && keywords.length > 0) {
      const keywordConditions = keywords
        .map(() => {
          params.push(`%${keywords[paramIndex - 1]}%`)
          return `EXISTS (SELECT 1 FROM unnest(keywords_ko) AS keyword WHERE keyword LIKE $${paramIndex})`
        })
        .join(" OR ")
      whereClause += ` AND (${keywordConditions})`
      paramIndex += keywords.length
    }

    if (bodyParts && bodyParts.length > 0) {
      const bodyPartConditions = bodyParts
        .map(() => {
          params.push(`%${bodyParts[paramIndex - 1]}%`)
          return `EXISTS (SELECT 1 FROM unnest(body_parts) AS body_part WHERE body_part LIKE $${paramIndex})`
        })
        .join(" OR ")
      whereClause += ` AND (${bodyPartConditions})`
      paramIndex += bodyParts.length

      console.log(33, bodyPartConditions)
    }

    if (equipments && equipments.length > 0) {
      const equipmentConditions = equipments
        .map(() => {
          params.push(`%${equipments[paramIndex - 1]}%`)
          return `EXISTS (SELECT 1 FROM unnest(equipments) AS equipment WHERE equipment LIKE $${paramIndex})`
        })
        .join(" OR ")
      whereClause += ` AND (${equipmentConditions})`
      paramIndex += equipments.length
    }

    const offset = (page - 1) * limit

    const dataQuery = `
      SELECT *, COUNT(*) OVER() as total_count
      FROM exercises 
      ${whereClause}
      ORDER BY exercise_id 
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `

    params.push(limit, offset)
    const exercisesData = await prisma.$queryRawUnsafe(dataQuery, ...params)

    if (
      !exercisesData ||
      !Array.isArray(exercisesData) ||
      exercisesData.length === 0
    ) {
      return { exercises: [], total: 0 }
    }

    const total = Number(exercisesData[0]?.total_count || 0)
    const exercises = exercisesData.map((exercise) => this.toDomain(exercise))
    return { exercises, total }
  }

  private toDomain(exercise: any): Exercise {
    return new Exercise(
      exercise.exercise_id, // id
      exercise.name, // name
      exercise.name_ko, // nameKo
      exercise.image_url, // imageUrl
      exercise.video_url, // videoUrl
      exercise.equipments, // equipments
      exercise.equipments_ko, // equipmentsKo
      exercise.body_parts, // bodyParts
      exercise.body_parts_ko, // bodyPartsKo
      exercise.exercise_type, // exerciseType
      exercise.keywords, // keywords
      exercise.keywords_ko, // keywordsKo
      exercise.overview, // overview
      exercise.overview_ko, // overviewKo
      exercise.instructions, // instructions
      exercise.instructions_ko, // instructionsKo
      exercise.exercise_tips, // exerciseTips
      exercise.exercise_tips_ko, // exerciseTipsKo
      exercise.variations, // variations
      exercise.related_exercise_ids // relatedExerciseIds
    )
  }
}
