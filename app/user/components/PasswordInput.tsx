import { Input } from "@/ds/components/atoms/input/Input"
import { ChangeEvent, useEffect, useState } from "react"
import { PasswordInputProps } from "@/app/user/types"
import ValidationItem from "@/app/signup/[steps]/components/ValidationItem"

const passwordValidations = [
  {
    label: "영문포함",
    validate: (value: string) => /[a-zA-Z]/.test(value),
  },
  {
    label: "숫자포함",
    validate: (value: string) => /[0-9]/.test(value),
  },
  {
    label: "8자~20자",
    validate: (value: string) => value.length >= 8 && value.length <= 20,
  },
]

const PasswordInput = ({ password, setPassword }: PasswordInputProps) => {
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const nextPassword = { ...password, [name]: value }
    setPassword(nextPassword)

    if (name === "passwordConfirm" || name === "password") {
      setIsPasswordMatch(
        nextPassword.passwordConfirm !== "" &&
          nextPassword.password !== "" &&
          nextPassword.passwordConfirm === nextPassword.password
      )
    }
  }

  useEffect(() => {
    setPassword({ ...password, validate: isPasswordValid && isPasswordMatch })
  }, [isPasswordValid, isPasswordMatch])

  return (
    <>
      <Input
        name="password"
        type="password"
        value={password.password}
        size={"lg"}
        className={"text-primary"}
        isFullWidth={true}
        placeholder={"새로운 비밀번호를 입력하세요"}
        onChange={handleChange}
        validations={passwordValidations}
        onValidationChange={setIsPasswordValid}
      />
      <div className="flex flex-col gap-0.5">
        <Input
          name="passwordConfirm"
          type="password"
          value={password.passwordConfirm}
          onChange={handleChange}
          placeholder="비밀번호 확인"
          className={"text-primary"}
          isFullWidth
          size="lg"
        />
        <ValidationItem isValid={isPasswordMatch} label="비밀번호 일치" />
      </div>
    </>
  )
}

export default PasswordInput
