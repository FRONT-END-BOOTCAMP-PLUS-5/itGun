import { useQuery } from "@tanstack/react-query"
import { getUserGauges } from "@/services/user/guages/getUserGuages"
import { useSession } from "next-auth/react"

export const useGetUserGauges = () => {
  const { data } = useSession()

  return useQuery({
    queryKey: ["userGuages", data?.user?.id],
    queryFn: () => getUserGauges(),
  })
}
