import { api } from "@/utils/api/apiClient"

interface Response {
  id: number
  arms: number
  legs: number
  shoulders: number
  back: number
  chest: number
  core: number
  stamina: number
  earnedAt?: Date
  createdAt?: Date
}

export const getUserGauges = () => {
  const endpoint = `/user/gauges`
  return api.get<Response>(endpoint)
}
