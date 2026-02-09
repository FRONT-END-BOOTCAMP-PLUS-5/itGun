import { Button } from "@/ds/components/atoms/button/Button"
import ValidationCheck from "@/ds/components/atoms/validationCheck/ValidationCheck"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import InputWithValidation from "@/ds/components/molecules/inputWithValidation/InputWithValidation"
import { checkEmail } from "@/services/user/checkEmail"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

import { useSignupStore } from "@/hooks/useSignupStore"
import { useEmailValidation } from "@/hooks/useEmailValidation"
import { SignupData } from "@/app/signup/[steps]/types"
import { EMAIL_VALIDATION_LABELS } from "@/app/constants"

function Step1Form() {
  const router = useRouter()
  const { set1Data } = useSignupStore()
  const [isPending, startTransition] = useTransition()

  const {
    formData,
    validation,
    handleChange,
    checkResult,
    setCheckResult,
    emailFormatSuccess,
  } = useEmailValidation()

  const emailValidations = EMAIL_VALIDATION_LABELS.map((item) => ({
    label: item.label,
    isValid: validation[item.value],
  }))

  const formAction = (formData: SignupData["step1"]) => {
    startTransition(async () => {
      if (!formData.email) return

      const result = await checkEmail(formData.email)
      setCheckResult({
        message: result.message,
        isAvailable: result.isAvailable,
      })
    })
  }

  const handleNext = () => {
    if (!checkResult?.isAvailable || !formData.email) return
    set1Data({ email: formData.email })
    router.push("/signup/step2")
  }

  console.log(formData)
  return (
    <form action={() => formAction(formData)} className="flex flex-1 flex-col">
      <InputWithValidation
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="아이디를 입력 해주세요"
        isFullWidth
        size="lg"
        validations={emailValidations}
      />
      {checkResult && (
        <ValidationCheck
          label={checkResult.message}
          variant={checkResult.isAvailable ? "success" : "error"}
          showIcon={false}
        />
      )}

      <Button
        isFullWidth
        size="lg"
        className="mt-auto mb-6"
        disabled={isPending || !emailFormatSuccess}
        variant={!emailFormatSuccess ? "disable" : "primary"}
        type={checkResult?.isAvailable ? "button" : "submit"}
        onClick={handleNext}
      >
        <S1 variant="white-200">
          {isPending
            ? "중복확인 중..."
            : checkResult?.isAvailable
              ? "다음"
              : "중복확인"}
        </S1>
      </Button>
    </form>
  )
}

export default Step1Form
