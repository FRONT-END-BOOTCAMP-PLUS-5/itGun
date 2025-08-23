import { getUserLogs } from "@/services/user/logs/getUserLogs"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface Params {
  calMonth: string
}

export const useGetUserLogs = ({ calMonth }: Params) => {
  const { data } = useSession()

  const year = Number(calMonth.split(".")[0])
  const month = Number(calMonth.split(".")[1])
  return useSuspenseQuery({
    queryKey: ["userLogs", data?.user?.id, calMonth],
    queryFn: () => getUserLogs(year, month),
  })
}
