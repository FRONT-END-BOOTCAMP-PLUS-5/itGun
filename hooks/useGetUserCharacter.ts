import { useQuery } from "@tanstack/react-query"

import { getUserCharacter } from "@/services/user/character/getUserCharacter"
import { useSession } from "next-auth/react"
interface Params {
  date?: string
}

export const useGetUserCharacter = ({ date }: Params = {}) => {
  const { data } = useSession()

  return useQuery({
    queryKey: ["userCharacter", data?.user?.id, { date }],
    queryFn: () => getUserCharacter(date),
  })
}
