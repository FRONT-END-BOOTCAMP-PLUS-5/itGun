import { Input } from "@/ds/components/atoms/input/Input"
import { ChangeEvent, useEffect, useState } from "react"
import { Password, PasswordInputProps } from "@/app/user/types"
import ValidationItem from "@/app/signup/[steps]/components/ValidationItem"

const PasswordInput = ({ password, setPassword }: PasswordInputProps) => {
  const [validation, setValidation] = useState({
    alphabet: false,
    number: false,
    length: false,
    match: false,
    passwordSuccess: false,
  })

  const validateCheck = (password: string, passwordConfirm: string) => {
    const alphabet = /[a-zA-Z]/.test(password)
    const number = /[0-9]/.test(password)
    const length = password.length >= 8 && password.length <= 20
    const match = password === passwordConfirm && password !== ""
    const passwordSuccess = alphabet && number && length && match

    return { alphabet, number, length, match, passwordSuccess }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPassword({ ...password, [name]: value })

    const result = validateCheck(
      name === "password" ? value : password.password,
      name === "passwordConfirm" ? value : password.passwordConfirm
    )
    setValidation(result)
  }

  useEffect(() => {
    setPassword({ ...password, validate: validation.passwordSuccess })
  }, [validation])

  return (
    <>
      <div className="flex flex-col gap-0.5">
        <Input
          name="password"
          type="password"
          value={password.password}
          size={"lg"}
          className={"text-primary"}
          isFullWidth={true}
          placeholder={"새로운 비밀번호를 입력하세요"}
          onChange={handleChange}
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
      </div>
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
        <div className="flex">
          <ValidationItem isValid={validation.match} label="비밀번호 일치" />
        </div>
      </div>
    </>
  )
}

export default PasswordInput
