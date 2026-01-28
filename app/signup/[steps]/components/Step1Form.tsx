import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { C2, S1 } from "@/ds/components/atoms/text/TextWrapper"
import { checkEmail } from "@/services/user/checkEmail"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState, useTransition } from "react"

import { useSignupStore } from "@/hooks/useSignupStore"
import { SignupData } from "@/app/signup/[steps]/types"

const emailErrorRules = [
  {
    when: (value: string) => value.trim() === "",
    message: "이메일을 입력해주세요",
  },
  {
    when: (value: string) =>
      value.length > 0 &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    message: "올바른 이메일 형식이 아닙니다",
  },
]

function Step1Form() {
  const router = useRouter()
  const { set1Data } = useSignupStore()

  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({ email: "" })
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [emailCheckResult, setEmailCheckResult] = useState({
    message: "",
    isAvailable: false,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ email: value })
    setEmailCheckResult({ message: "", isAvailable: false })
  }

  const formAction = (formData: SignupData["step1"]) => {
    startTransition(async () => {
      if (!formData.email || !isEmailValid) return

      const result = await checkEmail(formData.email)

      if (result.isAvailable) {
        setEmailCheckResult({
          message: result.message,
          isAvailable: true,
        })
      } else {
        setEmailCheckResult({
          message: result.message,
          isAvailable: false,
        })
      }
    })
  }

  const handleNext = () => {
    if (!emailCheckResult.isAvailable || !isEmailValid) return

    set1Data({ email: formData.email })
    router.push("/signup/step2")
  }

  return (
    <form action={() => formAction(formData)} className="flex flex-1 flex-col">
      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="아이디를 입력"
        isFullWidth
        size="lg"
        errorRules={emailErrorRules}
        onValidationChange={setIsEmailValid}
      />
      {emailCheckResult.message && (
        <C2
          variant={emailCheckResult.isAvailable ? "success" : "error"}
          className="mt-[5px]"
        >
          {emailCheckResult.message}
        </C2>
      )}

      <Button
        isFullWidth
        size="lg"
        className="mt-auto mb-6"
        disabled={isPending || !isEmailValid}
        variant={!isEmailValid ? "disable" : "primary"}
        type={emailCheckResult.isAvailable ? "button" : "submit"}
        onClick={handleNext}
      >
        <S1 variant="white-200">
          {isPending
            ? "중복확인 중..."
            : emailCheckResult.isAvailable
              ? "다음"
              : "중복확인"}
        </S1>
      </Button>
    </form>
  )
}

export default Step1Form
