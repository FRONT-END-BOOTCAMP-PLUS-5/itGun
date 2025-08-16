import React from "react"
import { CardProps } from "./Card.types"

export const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  className,
  ...props
}) => {
  const combinedClassName = `
    block aspect-square
    ${className || ""}
  `.trim()

  return (
    <picture className={combinedClassName} {...props}>
      <img src={imageSrc} alt={imageAlt} className="size-full object-cover" />
    </picture>
  )
}
