import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "@/services/user/info/getUserInfo"
import type { GetUserInfoResponse } from "@/services/user/info/getUserInfo"

export const useGetUserInfo = (userId: string) => {
  return useQuery({
    queryKey: ["userInfo", userId],
    queryFn: () => getUserInfo(),
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 fresh로 유지
    retry: 2, // 에러 시 2번만 재시도
    retryDelay: 1000, // 재시도 간격 1초
  })
}
