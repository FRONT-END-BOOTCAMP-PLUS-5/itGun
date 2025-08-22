"use client"
import React from "react"
import { useToastStore } from "@/hooks/useToastStore"
import Toast from "@/ds/components/molecules/toast/Toast"

const ToastContainer = () => {
  const { toasts, dismissToast } = useToastStore()

  return (
    <div>
      {toasts
        .filter((toast) => toast.message && toast.variant)
        .map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message!}
            variant={toast.variant!}
            duration={toast?.duration}
            position={toast?.position}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
    </div>
  )
}

export default ToastContainer
