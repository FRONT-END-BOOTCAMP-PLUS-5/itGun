import { useQuery } from "@tanstack/react-query"
import { getUserGauges } from "@/services/user/gauges/getUserGauges"
import { useSession } from "next-auth/react"

export const useGetUserGauges = () => {
  const { data } = useSession()

  return useQuery({
    queryKey: ["userGauges", data?.user?.id],
    queryFn: () => getUserGauges(),
  })
}
