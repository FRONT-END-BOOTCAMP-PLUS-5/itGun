import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { getUserBadges, Response } from "@/services/user/badges/getUserBadges"

interface Params {
  limit?: number
  period?: number
}

export const useGetUserBadges = (
  params: Params = {},
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">
) => {
  const { limit, period } = params
  return useQuery({
    queryKey: ["userBadges", { limit, period }],
    queryFn: () => getUserBadges(limit, period),
    ...options,
  })
}
