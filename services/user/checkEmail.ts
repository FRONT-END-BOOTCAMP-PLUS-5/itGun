import { api } from "@/utils/api/apiClient"

export interface EmailRequest {
  email: string
}

export interface EmailResponse {
  status: number
  message: string
  isAvailable: boolean
}

export const checkEmail = async (email: string) => {
  const response = await api.post<EmailResponse>("/user/email", {
    email,
  })
  return response
}
