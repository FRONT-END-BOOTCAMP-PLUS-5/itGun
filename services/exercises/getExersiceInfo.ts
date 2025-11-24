import { api } from "@/utils/api/apiClient"

interface Response {
  id: string
  name: string
  nameKo: string
  imageUrl: string
  videoUrl: string
  equipments: string[]
  equipmentsKo: string[]
  bodyParts: string[]
  bodyPartsKo: string[]
  exerciseType: string
  keywords: string[]
  keywordsKo: string[]
  overview: string
  overviewKo: string
  instructions: string[]
  instructionsKo: string[]
  exerciseTips: string[]
  exerciseTipsKo: string[]
  variations: string[]
  relatedExerciseIds: string[]
}

export const getExerciseInfo = (id: string) => {
  const endpoint = `/exercises/${id}`
  return api.get<Response>(endpoint)
}
