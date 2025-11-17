import { getUserLogs, GetLogsResponse } from "@/services/user/logs/getUserLogs"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface Params {
  calMonth: string
}

export const useGetUserLogs = (
  { calMonth }: Params,
  options?: Omit<UseQueryOptions<GetLogsResponse>, "queryKey" | "queryFn">
) => {
  const { data } = useSession()

  const year = Number(calMonth.split(".")[0])
  const month = Number(calMonth.split(".")[1])
  return useQuery({
    queryKey: ["userLogs", data?.user?.id, calMonth],
    queryFn: () => getUserLogs(year, month),
    ...options,
  })
}
