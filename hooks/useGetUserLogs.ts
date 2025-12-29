import { getUserLogs, GetLogsResponse } from "@/services/user/logs/getUserLogs"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface Params {
  year: string
  month: string
}

export const useGetUserLogs = (
  { year, month }: Params,
  options?: Omit<UseQueryOptions<GetLogsResponse>, "queryKey" | "queryFn">
) => {
  const { data } = useSession()

  return useQuery({
    queryKey: ["userLogs", data?.user?.id, {year, month}],
    queryFn: () => getUserLogs(Number(year), Number(month)),
    ...options,
  })
}
