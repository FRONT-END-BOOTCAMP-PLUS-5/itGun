import { api } from "@/utils/api/apiClient"

export interface DeleteUserRequest {
  // userId는 서버에서 getServerSession으로 가져옴
}

export interface DeleteUserResponse {
  success: boolean
  message: string
}

export const deleteUser = async (
  data: DeleteUserRequest
): Promise<DeleteUserResponse> => {
  // userId는 서버에서 getServerSession으로 가져옴
  const response = await api.delete<DeleteUserResponse>("/user/info")
  return response
}
