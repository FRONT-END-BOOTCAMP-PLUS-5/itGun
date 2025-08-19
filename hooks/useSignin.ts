import { signin } from "@/services/auth/signin"
import { useMutation } from "@tanstack/react-query"

// React Query 훅
export const useSignin = () => {
  return useMutation({
    mutationFn: signin,
  })
}
