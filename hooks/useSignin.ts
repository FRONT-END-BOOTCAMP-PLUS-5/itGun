import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToastStore } from "@/hooks/useToastStore"

export function useSignin() {
  const router = useRouter()
  const { showToast } = useToastStore()

  const signin = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        router.push("/")
      } else {
        showToast({
          message: "로그인 실패 😅 다시 확인해주세요!",
          variant: "error",
          position: "top",
        })
      }
    } catch (error) {
      showToast({
        message: "문제가 발생했어요 😢 잠시 후 다시 시도해주세요",
        variant: "error",
        position: "top",
      })
    }
  }

  return { signin }
}
