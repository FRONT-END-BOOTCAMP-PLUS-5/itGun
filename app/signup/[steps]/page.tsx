"use client"

import { H1 } from "@/ds/components/atoms/text/TextWrapper"
import { redirect, useParams } from "next/navigation"
import Step1Form from "./components/Step1Form"
import Step2Form from "./components/Step2Form"
import Step3Form from "./components/Step3Form"
import { useSignup } from "../context/SignupContext"
import { useEffect } from "react"

const SignupStepPage = () => {
  const { data } = useSignup()
  const params = useParams()
  const step = params.steps as string

  useEffect(
    function checkStep() {
      if (
        (step === "step2" && !data.step1.email) ||
        (step === "step3" && !(data.step1.email && data.step2.password))
      ) {
        return redirect("/signup/step1")
      }
    },
    [step, data]
  )

  if (!["step1", "step2", "step3"].includes(step)) {
    return redirect("/signup/step1")
  }

  return (
    <main className="flex size-full flex-col gap-10">
      <H1 className="whitespace-pre-line">
        {step === "step1" && `로그인에 사용할 \n 아이디를 입력해 주세요.`}
        {step === "step2" && `로그인에 사용할 \n 비밀번호를 입력해주세요.`}
        {step === "step3" && `기본정보를 \n 입력해주세요.`}
      </H1>

      {step === "step1" && <Step1Form />}
      {step === "step2" && <Step2Form />}
      {step === "step3" && <Step3Form />}
    </main>
  )
}

export default SignupStepPage
