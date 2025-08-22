"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { SignupContextType, SignupData } from "./SignupContext.types"

export const SignupContext = createContext<SignupContextType | null>(null)

const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SignupData>({
    step1: { email: "" },
    step2: { password: "" },
    step3: {
      nickname: "",
      height: undefined,
      weight: undefined,
      gender: undefined,
      age: undefined,
    },
  })

  const updateStep1 = (step1Data: SignupData["step1"]) => {
    setData((prev) => ({ ...prev, step1: step1Data }))
  }

  const updateStep2 = (step2Data: SignupData["step2"]) => {
    setData((prev) => ({ ...prev, step2: step2Data }))
  }

  return (
    <SignupContext.Provider
      value={{
        data,
        updateStep1,
        updateStep2,
      }}
    >
      {children}
    </SignupContext.Provider>
  )
}

const useSignup = () => {
  const context = useContext(SignupContext)
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider")
  }
  return context
}

export { SignupProvider, useSignup }
