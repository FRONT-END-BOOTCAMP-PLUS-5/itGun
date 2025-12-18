import { Log } from "@/app/user/logs/types"
import { create } from "zustand"

interface UserLogState {
  selectedDate : string | null
  logsOnMonth : Log[]
  logsToDisplay: Log[]
  isSlideUp: boolean
}

interface UserLogsStore extends UserLogState {
  setLogsOnMonth: (logs: Log[]) => void
  toggleSlideUp: () => void,
  handleIconClick: (logs: Log[]) => void
}

const initialState: UserLogState = {
  selectedDate: null,
  logsOnMonth: [],
  logsToDisplay: [],
  isSlideUp: false,
}

export const useUserLogsStore = create<UserLogsStore>((set) => ({
  ...initialState,
  setLogsOnMonth: (logs) => set({ logsOnMonth: logs, logsToDisplay: logs, selectedDate: null}),
  toggleSlideUp: () => set((state) => ({ isSlideUp: !state.isSlideUp })),
  handleIconClick: (logs) => set({
    logsToDisplay: logs,
    selectedDate: new Date(logs[0].logDate).toISOString(),
  }),
}))
