import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import {
  getUserCharacter,
  Response,
} from "@/services/user/character/getUserCharacter"
import { useSession } from "next-auth/react"
interface Params {
  date?: string
}

export const useGetUserCharacter = (
  { date }: Params = {},
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">
) => {
  const { data } = useSession()

  return useQuery({
    queryKey: ["userCharacter", data?.user?.id, { date }],
    queryFn: () => getUserCharacter(date),
    ...options,
  })
}
