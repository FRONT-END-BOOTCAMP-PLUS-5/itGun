import React from "react"
import { ButtonProps } from "./Button.types"
import { buttonVariants } from "@/ds/styles/tokens/button/variants"
import { buttonSizes } from "@/ds/styles/tokens/button/sizes"

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  isFullWidth = false,
  className,
  onClick,
  ...props
}) => {
  const combinedClassName = `
    inline-flex items-center justify-center
    ${buttonVariants[variant] ?? ""}
    ${buttonSizes[size] ?? ""}
    ${isFullWidth ? "w-full" : ""}
    ${className}
  `.trim()

  return (
    <button className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
