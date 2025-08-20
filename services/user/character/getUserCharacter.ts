import { api } from "@/utils/api/apiClient"

interface CharacterAsset {
  id: number
  level: number
  type: string
  svg: string
}

interface Response {
  characterColor: string
  assets: CharacterAsset[]
}

export const getUserCharacter = (date?: string) => {
  const params = new URLSearchParams()
  if (date) {
    params.append("date", String(date))
  }
  const queryString = params.toString()
  const endpoint = queryString
    ? `/user/character?${queryString}`
    : "/user/character"

  return api.get<Response>(endpoint)
}
