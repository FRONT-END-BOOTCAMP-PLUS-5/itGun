import { api } from "@/utils/api/apiClient"

export interface Request {
  password: string
}

interface Response {
  valid: boolean
}

export const postUserPassword = async (data: Request) => {
  return await api.post<Response>("/user/verify-password", data)
}
