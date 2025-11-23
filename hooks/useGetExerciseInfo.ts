import { getExerciseInfo } from "@/services/exercises/getExersiceInfo"
import { useQuery } from "@tanstack/react-query"

export const useGetExerciseInfo = (id: string) => {
  return useQuery({
    queryKey: ["exercise", id],
    queryFn: () => getExerciseInfo(id),
  })
}
