import { checkUserGauges } from "@/services/user/gauges/checkUserGauges"
import { useMutation } from "@tanstack/react-query"
import { useToastStore } from "./useToastStore"

export const useCheckUserGauge = () => {
  const { showToast } = useToastStore()

  return useMutation({
    mutationFn: () => checkUserGauges(),
    onSuccess: (res) => {
      if (res.message === "게이지가 감소되었습니다.") {
        showToast({
          message: "앗! 근육이 줄었어요 😢 \n운동으로 다시 키워볼까요?",
          variant: "info",
          position: "top",
          duration: 10000,
        })
      }
    },
  })
}
