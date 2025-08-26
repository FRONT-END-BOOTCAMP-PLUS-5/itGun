"use client"
import { create } from "zustand"

interface ModalState {
  currentModal: React.ReactNode | null
  openModal: (modal: React.ReactNode) => void
  closeModal: () => void
  isModalOpen: (modal: React.ReactNode) => boolean
}

export const useModalStore = create<ModalState>((set, get) => ({
  currentModal: null,

  openModal: (modal) => set(() => ({ currentModal: modal })),

  closeModal: () => set(() => ({ currentModal: null })),

  isModalOpen: (modal) => get().currentModal === modal,
}))
