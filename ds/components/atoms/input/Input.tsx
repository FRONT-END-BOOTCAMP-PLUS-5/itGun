"use client"

import React, { useState } from "react"
import { InputProps } from "./Input.types"
import { inputSizes } from "@/ds/styles/tokens/input/sizes"
import { C2 } from "../text/TextWrapper"
import Icon from "../icon/Icon"
import { Button } from "../button/Button"

export const Input: React.FC<InputProps> = ({
  type = "text",
  size = "md",
  isFullWidth = false,
  placeholder,
  validations = [],
  errorRules = [],
  readOnly = false,
  className,
  onChange,
  onValidationChange,
  ...props
}) => {
  const [validationFeedback, setValidationFeedback] = useState<boolean[]>([])
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const matchedError = errorRules.find((rule) => rule.when(value))
    setErrorMessage(matchedError ? matchedError.message : "")

    const validationResults = validations.map((rule) => rule.validate(value))
    setValidationFeedback(validationResults)

    if (onValidationChange) {
      const isValid =
        validationResults.length > 0
          ? validationResults.every((result) => result === true)
          : true
      const hasError = !!matchedError
      onValidationChange(isValid && !hasError)
    }

    onChange?.(e)
  }

  const combinedClassName = `
    border-b-1 border-[var(--color-secondary)] outline-none font-[var(--color-secondary)] relative
    ${inputSizes[size]}
    ${isFullWidth ? "w-full" : ""}
    ${readOnly ? "cursor-default" : ""}
    ${className || ""}
  `.trim()

  return (
    <div className="relative flex flex-col gap-1">
      <input
        type={
          type === "password" ? (isOpenPassword ? "text" : "password") : type
        }
        placeholder={placeholder}
        className={combinedClassName}
        onChange={handleChange}
        readOnly={readOnly}
        {...props}
      />

      {type === "password" && (
        <Button
          type="button"
          size="xs"
          variant="ghost"
          className="absolute top-1/2 right-0 -translate-y-1/2"
          onClick={() => {
            setIsOpenPassword((prev) => !prev)
          }}
        >
          <Icon name={isOpenPassword ? "eyeCrossed" : "eye"} />
        </Button>
      )}

      {/* Error message */}
      {errorMessage && <C2 variant="error">{errorMessage}</C2>}

      {/* Validation */}
      {validations.length > 0 && (
        <div className="flex flex-wrap gap-5">
          {validations.map((rule, idx) => (
            <div key={idx} className="flex flex-wrap items-center gap-[5px]">
              <C2 variant={validationFeedback[idx] ? "success" : "disable"}>
                {rule.label}
              </C2>
              <Icon
                name="check"
                size={15}
                color={validationFeedback[idx] ? "success" : "disable"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
