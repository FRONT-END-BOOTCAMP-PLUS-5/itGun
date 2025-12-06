import { FormData } from "@/app/logs/types"
import { Exercise } from "@/services/exercises/getExercises"
import { create } from "zustand"

interface LogsState {
  mode: "logs" | "exercises"
  open: boolean
  formData: FormData[]
}

interface LogsStore extends LogsState {
  setOpen: (open: boolean) => void
  setMode: (mode: "logs" | "exercises") => void
  setFormData: (
    formData: FormData[] | ((prev: FormData[]) => FormData[])
  ) => void
}

const initialState: LogsState = {
  mode: "exercises",
  open: false,
  formData: [],
}

export const useLogsStore = create<LogsStore>((set) => ({
  ...initialState,
  setOpen: (open) => set({ open }),
  setMode: (mode) => set({ mode }),
  setFormData: (formData) =>
    set((state) => {
      const newFormData =
        typeof formData === "function" ? formData(state.formData) : formData
      return {
        formData: newFormData,
      }
    }),
}))
