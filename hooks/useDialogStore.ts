import { DialogProps } from "@/ds/components/molecules/dialog/Dialog.types"
import { create } from "zustand"

export interface DialogState extends DialogProps {
  id: number
}

interface DialogStore {
  dialogs: DialogState[]
  showDialog: (dialog: Omit<DialogState, "id">) => void
  dismissDialog: (id: number) => void
}

let dialogId = 0

export const useDialogStore = create<DialogStore>((set) => ({
  dialogs: [],
  showDialog: (dialog) => {
    const id = dialogId++
    set((state) => ({ dialogs: [...state.dialogs, { ...dialog, id }] }))
  },
  dismissDialog: (id) => {
    set((state) => ({
      dialogs: state.dialogs.filter((d) => d.id !== id),
    }))
  },
}))
