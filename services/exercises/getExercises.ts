import { api } from "@/utils/api/apiClient"

export interface Exercise {
  exerciseId: string
  name: string
  imageUrl: string
  videoUrl: string
  equipments: string[]
  bodyParts: string[]
  exerciseType: string
  keywords: string[]
  overview: string
  instructions: string[]
  exerciseTips: string[]
  variations: string[]
  relatedExerciseIds: string[]
}

export interface ExercisesResponse {
  data: Exercise[]
  meta?: {
    total: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    page: number
  }
}

export interface GetExercisesParams {
  q?: string
  bodyPart?: string
  equipment?: string
  page?: number
  limit?: number
}

export const getExercises = (params?: GetExercisesParams) => {
  const searchParams = new URLSearchParams()

  if (params?.q) {
    searchParams.append("q", params.q)
  }
  if (params?.bodyPart) {
    searchParams.append("bodyPart", params.bodyPart)
  }
  if (params?.equipment) {
    searchParams.append("equipment", params.equipment)
  }
  if (params?.page) {
    searchParams.append("page", String(params.page))
  }
  if (params?.limit) {
    searchParams.append("limit", String(params.limit))
  }

  const queryString = searchParams.toString()
  const endpoint = queryString ? `/exercises?${queryString}` : "/exercises"

  return api.get<ExercisesResponse>(endpoint)
}
