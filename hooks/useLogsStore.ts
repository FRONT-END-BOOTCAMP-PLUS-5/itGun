import { FormData } from "@/app/logs/types"
import { create } from "zustand"

interface LogsState {
  formData: FormData[]
}

interface LogsStore extends LogsState {
  setFormData: (
    formData: FormData[] | ((prev: FormData[]) => FormData[])
  ) => void
}

const initialState: LogsState = {
  formData: [],
}

export const useLogsStore = create<LogsStore>((set) => ({
  ...initialState,
  setFormData: (formData) =>
    set((state) => {
      const newFormData =
        typeof formData === "function" ? formData(state.formData) : formData
      return {
        formData: newFormData,
      }
    }),
}))
