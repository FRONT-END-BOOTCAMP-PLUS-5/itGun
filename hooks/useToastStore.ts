import { ToastProps } from "@/ds/components/molecules/toast/Toast.types"
import { create } from "zustand"

interface Toast extends Partial<ToastProps> {
  id: number
}

interface ToastState {
  toasts: Toast[]
  showToast: (toast: Partial<ToastProps>) => void
  dismissToast: (id: number) => void
}

let toastId = 0

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (toast) => {
    const id = toastId++
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))
  },
  dismissToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
}))
