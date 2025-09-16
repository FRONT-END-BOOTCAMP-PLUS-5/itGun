import { api } from "@/utils/api/apiClient"

interface Response {
  message: string
}

export const deleteUserInfo = () => {
  const endpoint = `/user/info`
  return api.delete<Response>(endpoint)
}
