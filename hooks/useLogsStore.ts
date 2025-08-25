import { Exercise } from "@/services/exercises/getExercises"
import { create } from "zustand"

interface LogsState {
  mode: "logs" | "exercises"
  open: boolean
  exerciseData: Exercise | object
}

interface LogsStore extends LogsState {
  setOpen: (open: boolean) => void
  setMode: (mode: "logs" | "exercises") => void
  setData: (data: object) => void
  setInit: () => void
}

const initialState: LogsState = {
  mode: "exercises",
  open: false,
  exerciseData: {},
}

export const useLogsStore = create<LogsStore>((set) => ({
  ...initialState,
  setOpen: (open) => set({ open }),
  setMode: (mode) => set({ mode }),
  setData: (data) => set({ exerciseData: data }),
  setInit: () => set(initialState),
}))
