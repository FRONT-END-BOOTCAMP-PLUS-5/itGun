import { api } from "@/utils/api/apiClient"

export interface DeleteUserRequest {
  userId: string
}

export interface DeleteUserResponse {
  success: boolean
  message: string
}

export const deleteUser = async (
  data: DeleteUserRequest
): Promise<DeleteUserResponse> => {
  // DELETE 요청에 데이터를 전송하기 위해 URL 파라미터로 전달
  const response = await api.delete<DeleteUserResponse>(
    `/api/user/info?userId=${data.userId}`
  )
  return response
}
