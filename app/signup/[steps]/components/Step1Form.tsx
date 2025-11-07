import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { C2, S1 } from "@/ds/components/atoms/text/TextWrapper"
import { checkEmail } from "@/services/user/checkEmail"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState, useTransition } from "react"
import { SignupData } from "../../context/SignupContext.types"
import { useSignupStore } from "@/hooks/useSignupStore"

function Step1Form() {
  const router = useRouter()
  const { set1Data } = useSignupStore()

  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({ email: "" })
  const [validation, setValidation] = useState({
    emailError: "",
    emailSuccess: false,
  })

  const validateCheck = (email: string) => {
    if (!email) return "아이디를 입력해주세요"
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "올바른 이메일 형식이 아닙니다"
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatError = validateCheck(value)

    setFormData({ email: value })

    if (formatError) {
      setValidation({ emailError: formatError, emailSuccess: false })
    } else {
      setValidation({ emailError: "", emailSuccess: false })
    }
  }

  const formAction = (formData: SignupData["step1"]) => {
    startTransition(async () => {
      if (!formData.email) return

      const result = await checkEmail(formData.email)

      if (result.isAvailable) {
        setValidation({ emailError: "", emailSuccess: true })
      } else {
        setValidation({
          emailError: "이미 사용중인 이메일입니다",
          emailSuccess: false,
        })
      }
    })
  }

  const handleNext = () => {
    if (!validation.emailSuccess || !formData.email) return

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
      />
      {validation.emailError && (
        <C2 variant="error" className="mt-[5px]">
          {validation.emailError}
        </C2>
      )}
      {!validation.emailError && validation.emailSuccess && (
        <C2 variant="success" className="mt-[5px]">
          사용 가능한 이메일입니다.
        </C2>
      )}

      <Button
        isFullWidth
        size="lg"
        className="mt-auto mb-6"
        disabled={isPending || !!validation.emailError}
        variant={validation.emailError ? "disable" : "primary"}
        type={validation.emailSuccess ? "button" : "submit"}
        onClick={handleNext}
      >
        <S1 variant="white-200">
          {isPending
            ? "중복확인 중..."
            : validation.emailSuccess
              ? "다음"
              : "중복확인"}
        </S1>
      </Button>
    </form>
  )
}

export default Step1Form
