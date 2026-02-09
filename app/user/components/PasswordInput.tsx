import { useEffect } from "react"
import { PasswordInputProps } from "@/app/user/types"
import { usePasswordValidation } from "@/hooks/usePasswordValidation"
import PasswordInputGroup from "@/ds/components/organisms/passwordInputGroup/PasswordInputGroup"
import {
  PASSWORD_CONFIRM_VALIDATION_LABEL,
  PASSWORD_VALIDATION_LABELS,
} from "@/app/constants"

const PasswordInput = ({ setPassword }: PasswordInputProps) => {
  const { formData, validation, handleChange, passwordSuccess } =
    usePasswordValidation()

  useEffect(() => {
    setPassword({
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      validate: passwordSuccess,
    })
  }, [formData, passwordSuccess, setPassword])

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
    <PasswordInputGroup
      className="gap-[30px]"
      password={{
        name: "password",
        type: "password",
        value: formData.password,
        onChange: handleChange,
        placeholder: "새로운 비밀번호를 입력하세요",
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
  )
}

export default PasswordInput
