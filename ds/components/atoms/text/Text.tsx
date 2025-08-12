import React from "react"
import "../../../styles/globals.css"
import { textVariants } from "../../../styles/tokens/text/textVariants"
import { TextProps } from "./Text.types"

const Text: React.FC<TextProps> = ({
  children,
  size,
  fontWeight,
  variant,
  className,
  ...props
}) => {
  const variantClass = variant ? textVariants[variant] : ""
  const sizeClass = size ?? "text-base"
  const weightClass = fontWeight === "bold" ? "font-bold" : "font-normal"

  const combinedClassName =
    `${variantClass} ${sizeClass} ${weightClass} ${className}`.trim()
  return (
    <p className={combinedClassName} {...props}>
      {children}
    </p>
  )
}

export default Text
