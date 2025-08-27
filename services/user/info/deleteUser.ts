import { api } from "@/utils/api/apiClient"

export interface DeleteUserResponse {
  success: boolean
  message: string
}

export const deleteUser = async (): Promise<DeleteUserResponse> => {
  const response = await api.delete<DeleteUserResponse>("/user/info")
  return response
}
