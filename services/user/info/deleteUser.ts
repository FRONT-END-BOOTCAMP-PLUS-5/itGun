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
  const response = await api.delete<DeleteUserResponse>("/api/user/info", data)
  return response
}
