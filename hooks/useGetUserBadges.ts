import { useQuery } from "@tanstack/react-query"
import { getUserBadges } from "@/services/user/badges/getUserBadges"

interface Params {
  limit?: number
  period?: number
}

export const useGetUserBadges = ({ limit, period }: Params = {}) => {
  return useQuery({
    queryKey: ["userBadges", { limit, period }],
    queryFn: () => getUserBadges(limit, period),
  })
}
