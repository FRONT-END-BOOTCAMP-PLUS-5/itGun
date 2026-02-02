import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import {
  getUserCharacter,
  Response,
  GetUserCharacterParams,
} from "@/services/user/character/getUserCharacter"
import { useSession } from "next-auth/react"

export const useGetUserCharacter = (
  params?: GetUserCharacterParams,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">
) => {
  const { data } = useSession()

  return useQuery({
    queryKey: ["userCharacter", data?.user?.id, params],
    queryFn: () => getUserCharacter(params),
    ...options,
  })
}
