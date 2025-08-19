"use client"

import React, { useState } from "react"
import { InputProps } from "./Input.types"
import { inputSizes } from "@/ds/styles/tokens/input/sizes"
import { C2 } from "../text/TextWrapper"
import Icon from "../icon/Icon"

export const Input: React.FC<InputProps> = ({
  type = "text",
  size = "md",
  isFullWidth = false,
  placeholder,
  validations = [],
  errorRules = [],
  className,
  onChange,
  ...props
}) => {
  const [validationFeedback, setValidationFeedback] = useState<boolean[]>([])
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const matchedError = errorRules.find((rule) => rule.when(value))
    setErrorMessage(matchedError ? matchedError.message : "")

    const validationResults = validations.map((rule) => rule.validate(value))
    setValidationFeedback(validationResults)

    onChange?.(e)
  }

  const combinedClassName = `
    border-b-1 border-[var(--color-secondary)] outline-none font-[var(--color-secondary)]
    ${inputSizes[size]}
    ${isFullWidth ? "w-full" : ""}
    ${className || ""}
  `.trim()

  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        className={combinedClassName}
        onChange={handleChange}
        {...props}
      />

      {/* Error message */}
      {errorMessage && <C2 variant="error">{errorMessage}</C2>}

      {/* Validation */}
      {validations.length > 0 && (
        <div className="flex flex-wrap gap-5">
          {validations.map((rule, idx) => (
            <div className="flex flex-wrap items-center gap-[5px]">
              <C2
                key={idx}
                variant={validationFeedback[idx] ? "success" : "disable"}
              >
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
