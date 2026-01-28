import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import ValidationItem from "./ValidationItem"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import { useSignupStore } from "@/hooks/useSignupStore"
import { ValidatePassword } from "@/app/signup/[steps]/types"
import { passwordValidations } from "@/utils/validation"

const Step2Form = () => {
  const router = useRouter()
  const { set2Data } = useSignupStore()

  const [formData, setFormData] = useState<ValidatePassword>({
    password: "",
    passwordConfirm: "",
  })
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const nextFormData = { ...formData, [name]: value }
    setFormData(nextFormData)
    setIsPasswordMatch(
      nextFormData.passwordConfirm !== "" &&
        nextFormData.password !== "" &&
        nextFormData.passwordConfirm === nextFormData.password
    )
  }

  const handleNext = () => {
    if (!isPasswordValid || !isPasswordMatch) return

    set2Data({ password: formData.password })
    router.push("/signup/step3")
  }

  return (
    <form className="flex flex-1 flex-col gap-10">
      <Input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호 입력"
        isFullWidth
        size="lg"
        validations={passwordValidations}
        onValidationChange={setIsPasswordValid}
      />

      <div className="flex flex-col">
        <Input
          name="passwordConfirm"
          type="password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          placeholder="비밀번호 확인"
          isFullWidth
          size="lg"
        />
        <ValidationItem isValid={isPasswordMatch} label="비밀번호 일치" />
      </div>

      <Button
        type="button"
        size="lg"
        disabled={!isPasswordValid || !isPasswordMatch}
        variant={!isPasswordValid || !isPasswordMatch ? "disable" : "primary"}
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
