import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getUserGauges, Response } from "@/services/user/gauges/getUserGauges"
import { useSession } from "next-auth/react"

export const useGetUserGauges = (
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">
) => {
  const { data } = useSession()

  return useQuery({
    queryKey: ["userGauges", data?.user?.id],
    queryFn: () => getUserGauges(),
    ...options,
  })
}
