import { Button } from "@/ds/components/atoms/button/Button"
import { useRouter } from "next/navigation"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import { useSignupStore } from "@/hooks/useSignupStore"
import { usePasswordValidation } from "@/hooks/usePasswordValidation"
import PasswordInputGroup from "@/ds/components/organisms/passwordInputGroup/PasswordInputGroup"
import {
  PASSWORD_CONFIRM_VALIDATION_LABEL,
  PASSWORD_VALIDATION_LABELS,
} from "@/app/constants"

const Step2Form = () => {
  const router = useRouter()
  const { set2Data } = useSignupStore()
  const { formData, validation, handleChange, passwordSuccess } =
    usePasswordValidation()

  const handleNext = () => {
    if (!passwordSuccess) return

    set2Data({ password: formData.password })
    router.push("/signup/step3")
  }

  const passwordValidations = PASSWORD_VALIDATION_LABELS.map((item) => ({
    label: item.label,
    isValid: validation[item.value],
  }))

  const passwordConfirmValidations = PASSWORD_CONFIRM_VALIDATION_LABEL.map(
    (item) => ({
      label: item.label,
      isValid: validation[item.value],
    })
  )

  return (
    <form className="flex flex-1 flex-col">
      <PasswordInputGroup
        className="gap-10"
        password={{
          name: "password",
          type: "password",
          value: formData.password,
          onChange: handleChange,
          placeholder: "비밀번호 입력",
          isFullWidth: true,
          size: "lg",
          className: "text-primary",
          validations: passwordValidations,
        }}
        passwordConfirm={{
          name: "passwordConfirm",
          type: "password",
          value: formData.passwordConfirm,
          onChange: handleChange,
          placeholder: "비밀번호 확인",
          className: "text-primary",
          isFullWidth: true,
          size: "lg",
          validations: passwordConfirmValidations,
        }}
      />
      <Button
        type="button"
        size="lg"
        disabled={!passwordSuccess}
        variant={!passwordSuccess ? "disable" : "primary"}
        onClick={handleNext}
        className="mt-auto mb-6"
        isFullWidth
      >
        <S1 variant="white-200">다음</S1>
      </Button>
    </form>
  )
}

export default Step2Form
