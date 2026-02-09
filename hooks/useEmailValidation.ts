import { useState, ChangeEvent } from "react"

export interface EmailValidationState {
  hasValue: boolean
  validFormat: boolean
  emailFormatSuccess: boolean
}

export interface EmailCheckResult {
  message: string
  isAvailable: boolean
}

const validateCheck = (email: string): EmailValidationState => {
  const hasValue = email.trim().length > 0
  const validFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  )
  const emailFormatSuccess = hasValue && validFormat

  return { hasValue, validFormat, emailFormatSuccess }
}

export const useEmailValidation = () => {
  const [formData, setFormData] = useState({ email: "" })
  const [validation, setValidation] = useState<EmailValidationState>({
    hasValue: false,
    validFormat: false,
    emailFormatSuccess: false,
  })
  const [checkResult, setCheckResult] = useState<EmailCheckResult | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ email: value })
    const result = validateCheck(value)
    setValidation(result)
    setCheckResult(null)
  }

  return {
    formData,
    validation,
    handleChange,
    checkResult,
    setCheckResult,
    emailFormatSuccess: validation.emailFormatSuccess,
  }
}
