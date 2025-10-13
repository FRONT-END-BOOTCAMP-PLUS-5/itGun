import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import ValidationItem from "./ValidationItem"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import { useSignupStore } from "@/hooks/useSignupStore"

interface ValidatePassword {
  password: string
  passwordConfirm: string
}

const Step2Form = () => {
  const router = useRouter()
  const { set2Data } = useSignupStore()

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  })
  const [validation, setValidation] = useState({
    alphabet: false,
    number: false,
    length: false,
    match: false,
    passwordSuccess: false,
  })

  const validateCheck = ({ password, passwordConfirm }: ValidatePassword) => {
    const alphabet = /[a-zA-Z]/.test(password)
    const number = /[0-9]/.test(password)
    const length = password.length >= 8 && password.length <= 20
    const match = password === passwordConfirm && password !== ""
    const passwordSuccess = alphabet && number && length && match

    return { alphabet, number, length, match, passwordSuccess }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    const result = validateCheck({
      password: name === "password" ? value : formData.password,
      passwordConfirm:
        name === "passwordConfirm" ? value : formData.passwordConfirm,
    })
    setValidation(result)
  }

  const handleNext = () => {
    if (!validation.passwordSuccess) return

    set2Data({ password: formData.password })
    router.push("/signup/step3")
  }

  return (
    <form className="flex flex-1 flex-col">
      <Input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호 입력"
        isFullWidth
        size="lg"
      />
      <div className="flex gap-5">
        {[
          { value: "alphabet", label: "영문포함" },
          { value: "number", label: "숫자포함" },
          { value: "length", label: "8자~20자" },
        ].map(({ value, label }) => (
          <ValidationItem
            key={value}
            isValid={validation[value as keyof typeof validation]}
            label={label}
          />
        ))}
      </div>

      <Input
        name="passwordConfirm"
        type="password"
        value={formData.passwordConfirm}
        onChange={handleChange}
        placeholder="비밀번호 확인"
        className="mt-10"
        isFullWidth
        size="lg"
      />
      {formData.passwordConfirm && (
        <ValidationItem
          isValid={validation.match}
          label="비밀번호 일치"
          className="mt-2"
        />
      )}

      <Button
        type="button"
        size="lg"
        disabled={!validation.passwordSuccess}
        variant={!validation.passwordSuccess ? "disable" : "primary"}
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
