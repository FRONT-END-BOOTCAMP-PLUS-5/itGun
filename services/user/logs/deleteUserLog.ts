import { api } from "@/utils/api/apiClient"

export const deleteUserLog = (id: string) => {
  return api.delete<Response>(`/user/logs/${id}`)
}
