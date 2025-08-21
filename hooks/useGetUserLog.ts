import { useQuery } from "@tanstack/react-query"
import { getUserLog } from "@/services/user/logs/getUserLog"

export const useGetUserLog = (id: string) => {
  return useQuery({
    queryKey: ["userLog", { id }],
    queryFn: () => getUserLog(id),
    suspense: true,
  })
}
