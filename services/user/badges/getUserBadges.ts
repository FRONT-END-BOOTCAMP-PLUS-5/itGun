import { api } from "@/utils/api/apiClient"

export interface Badge {
  id: number
  name: string
  expirationDays?: number | null
  description?: string
}

export interface UserBadge {
  badgeId: number
  count: number
  latestEarnedAt: Date
}

interface Response {
  badges: Badge[]
  userBadges: UserBadge[]
}

export const getUserBadges = (limit?: number, period?: number) => {
  const params = new URLSearchParams()
  if (limit) {
    params.append("limit", String(limit))
  }
  if (period) {
    params.append("period", String(period))
  }

  const queryString = params.toString()
  const endpoint = queryString ? `/user/badges?${queryString}` : "/user/badges"

  return api.get<Response>(endpoint)
}
