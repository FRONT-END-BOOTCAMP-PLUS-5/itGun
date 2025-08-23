import { getUserLog } from "@/services/user/logs/getUserLog"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useGetUserLog = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["userLog", { id }],
    queryFn: () => getUserLog(id),
  })
}
