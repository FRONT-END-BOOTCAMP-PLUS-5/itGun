import { useMutation } from "@tanstack/react-query"
import { deleteUser, DeleteUserRequest } from "@/services/user/info/deleteUser"

export interface UseDeleteUserOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const useDeleteUser = (options?: UseDeleteUserOptions) => {
  return useMutation({
    mutationFn: (data: DeleteUserRequest) => deleteUser(data),
    onSuccess: () => {
      // 성공 시 로그아웃 처리나 다른 정리 작업 수행
      options?.onSuccess?.()
    },
    onError: (error: Error) => {
      options?.onError?.(error)
    },
  })
}
