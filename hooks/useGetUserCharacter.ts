import { useQuery } from "@tanstack/react-query"

import { getUserCharacter } from "@/services/user/character/getUserCharacter"
interface Params {
  date?: string
}

export const useGetUserCharacter = ({ date }: Params = {}) => {
  return useQuery({
    queryKey: ["userCharacter", { date }],
    queryFn: () => getUserCharacter(date),
  })
}
