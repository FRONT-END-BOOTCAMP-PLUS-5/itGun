import { FormData } from "@/app/logs/types"
import { create } from "zustand"
import { CalIconType } from "@/services/user/logs/createUserLogs"
import dayjs from "dayjs"

interface LogsState {
  formData: FormData[]
  calIconType: CalIconType | null
  date: string
  totalDuration: number
}

interface LogsStore extends LogsState {
  setFormData: (
    formData: FormData[] | ((prev: FormData[]) => FormData[])
  ) => void
  setCalIconType: (calIconType: CalIconType | null) => void
  setDate: (date: string) => void
  setTotalDuration: (totalDuration: number) => void
  setInit: () => void
}

const initialState: LogsState = {
  formData: [],
  calIconType: null,
  date: dayjs().format("YYYY.MM.DD"),
  totalDuration: 0,
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
  setCalIconType: (calIconType) =>
    set(() => ({
      calIconType,
    })),
  setDate: (date) =>
    set(() => ({
      date,
    })),
  setTotalDuration: (totalDuration) =>
    set(() => ({
      totalDuration,
    })),
  setInit: () =>
    set(() => ({
      formData: [],
      calIconType: null,
      date: dayjs().format("YYYY.MM.DD"),
      totalDuration: 0,
    })),
}))
