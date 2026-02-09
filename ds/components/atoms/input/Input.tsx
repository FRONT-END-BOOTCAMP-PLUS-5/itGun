"use client"

import React from "react"
import { InputProps } from "./Input.types"
import { inputSizes } from "@/ds/styles/tokens/input/sizes"

export const Input: React.FC<InputProps> = ({
  type = "text",
  size = "md",
  isFullWidth = false,
  placeholder,
  readOnly = false,
  className,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange?.(e)
  }

  const combinedClassName = `
    border-b-1 border-[var(--color-secondary)] outline-none font-[var(--color-secondary)]
    ${inputSizes[size]}
    ${isFullWidth ? "w-full" : ""}
    ${readOnly ? "cursor-default" : ""}
    ${className || ""}
  `.trim()

  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        className={combinedClassName}
        onChange={handleChange}
        readOnly={readOnly}
        {...props}
      />
    </div>
  )
}
