import { api } from "@/utils/api/apiClient"

interface CharacterAsset {
  id: number
  level: number
  type: string
  svg: string
}

export interface Response {
  characterColor: string
  assets: CharacterAsset[]
}

export interface GetUserCharacterParams {
  earnedAt?: string
  createdAt?: string
}

export const getUserCharacter = (params?: GetUserCharacterParams) => {
  const searchParams = new URLSearchParams()

  if (params?.earnedAt) {
    searchParams.append("earnedAt", params.earnedAt)
  }
  if (params?.createdAt) {
    searchParams.append("createdAt", params.createdAt)
  }

  const queryString = searchParams.toString()
  const endpoint = queryString
    ? `/user/character?${queryString}`
    : "/user/character"

  return api.get<Response>(endpoint)
}
