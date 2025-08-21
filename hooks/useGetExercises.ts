import { useInfiniteQuery } from "@tanstack/react-query"
import {
  getExercises,
  GetExercisesParams,
} from "@/services/exercises/getExercises"

interface UseGetExercisesParams extends Omit<GetExercisesParams, "page"> {
  limit?: number
}

export const useGetExercises = (params: UseGetExercisesParams = {}) => {
  const { limit = 20, ...restParams } = params

  return useInfiniteQuery({
    queryKey: ["exercises", restParams],
    queryFn: ({ pageParam = 1 }) =>
      getExercises({
        ...restParams,
        page: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta?.hasNextPage) {
        return (lastPage.meta.page || 0) + 1
      }
      return undefined
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.meta?.hasPreviousPage) {
        return Math.max((firstPage.meta.page || 1) - 1, 1)
      }
      return undefined
    },
  })
}
