import { api } from "@/utils/api/apiClient"

interface Response {
  message: string
}

export const checkUserGauges = () => {
  return api.post<Response>("/user/gauges")
}
