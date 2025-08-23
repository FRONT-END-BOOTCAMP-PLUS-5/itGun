import { useInfiniteQuery } from "@tanstack/react-query"
import {
  getExercises,
  GetExercisesParams,
} from "@/services/exercises/getExercises"

interface UseGetExercisesParams extends Omit<GetExercisesParams, "page"> {
  limit?: number
}

export const useGetExercises = (params: UseGetExercisesParams = {}) => {
  const { limit = 10, ...restParams } = params

  return useInfiniteQuery({
    queryKey: ["exercises", restParams],
    queryFn: ({ pageParam }) => {
      return getExercises({ ...restParams, page: pageParam, limit })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNextPage ? lastPage.meta.page + 1 : undefined
    },
  })
}
