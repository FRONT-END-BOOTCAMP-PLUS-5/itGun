export interface ExerciseApiResponse {
  success: boolean
  meta: {
    total: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    nextCursor: string
  }
  data: ExerciseApiData[]
}

export interface ExerciseApiData {
  exerciseId: string
  name: string
  imageUrl: string
  videoUrl: string
  bodyParts: string[]
  equipments: string[]
  exerciseType: string
  instructions: string[]
  exerciseTips: string[]
}
