import React from "react"
import { Input as DSInput } from "@/ds/components/atoms/input/Input"
import type { InputProps } from "@/ds/components/atoms/input/Input.types"

interface CustomInputProps extends InputProps {
  className?: string
  variant?: "primary" | "secondary"
}

export const Input: React.FC<CustomInputProps> = ({
  className = "",
  variant = "secondary",
  ...props
}) => {
  const variantStyles = {
    primary: "border-none focus:border-none focus:outline-none  ",
    secondary:
      "border-b border-[var(--color-secondary)] focus:border-[var(--color-secondary)] ",
  }

  return (
    <DSInput
      {...props}
      className={`h-[30px] w-[330px] bg-transparent p-0 text-base text-gray-600 outline-none placeholder:text-gray-400 ${variantStyles[variant]} ${className}`}
    />
  )
}

export type { InputProps }
