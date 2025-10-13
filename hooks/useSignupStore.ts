"use client"
import { SignupData } from "@/app/signup/context/SignupContext.types"
import { create } from "zustand"

interface DataState {
  data: SignupData
  set1Data: (data: SignupData["step1"]) => void
  set2Data: (data: SignupData["step2"]) => void
  set3Data: (data: SignupData["step3"]) => void
}

export const useSignupStore = create<DataState>((set, get) => ({
  data: {
    step1: { email: "" },
    step2: { password: "" },
    step3: {
      nickname: "",
      height: undefined,
      weight: undefined,
      gender: undefined,
      age: undefined,
    },
  },

  set1Data: (data1: SignupData["step1"]) =>
    set((state: DataState) => ({ data: { ...state.data, step1: data1 } })),
  set2Data: (data2: SignupData["step2"]) =>
    set((state: DataState) => ({ data: { ...state.data, step2: data2 } })),
  set3Data: (data3: SignupData["step3"]) =>
    set((state: DataState) => ({ data: { ...state.data, step3: data3 } })),
}))
