import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { getUserInfo } from "@/services/user/info/getUserInfo"

export const useGetUserInfo = () => {
  const { data } = useSession()

  return useQuery({
    queryKey: ["userInfo", data?.user?.id],
    queryFn: () => getUserInfo(),
  })
}
