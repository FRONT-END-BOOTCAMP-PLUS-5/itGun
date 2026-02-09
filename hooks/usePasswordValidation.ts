import { useState, ChangeEvent } from "react"

interface PasswordValidationState {
  alphabet: boolean
  number: boolean
  length: boolean
  match: boolean
  passwordSuccess: boolean
}

interface PasswordFormData {
  password: string
  passwordConfirm: string
}

const validateCheck = ({ password, passwordConfirm }: PasswordFormData): PasswordValidationState => {
  const alphabet = /[a-zA-Z]/.test(password)
  const number = /[0-9]/.test(password)
  const length = password.length >= 8 && password.length <= 20
  const match = password === passwordConfirm && password !== ""
  const passwordSuccess = alphabet && number && length && match

  return { alphabet, number, length, match, passwordSuccess }
}

export const usePasswordValidation = () => {
  const [formData, setFormData] = useState<PasswordFormData>({
    password: "",
    passwordConfirm: "",
  })
  const [validation, setValidation] = useState<PasswordValidationState>({
    alphabet: false,
    number: false,
    length: false,
    match: false,
    passwordSuccess: false,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedFormData = { ...formData, [name]: value }
    setFormData(updatedFormData)

    const result = validateCheck(updatedFormData)
    setValidation(result)
  }

  return {
    formData,
    validation,
    handleChange,
    passwordSuccess: validation.passwordSuccess,
  }
}
