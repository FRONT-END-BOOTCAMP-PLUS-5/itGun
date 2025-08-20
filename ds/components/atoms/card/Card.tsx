import React from "react"
import { CardProps } from "./Card.types"
import Image from "next/image"

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
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt ? imageAlt : "캐러셀 카드 이미지"}
          className="size-full object-cover"
        />
      )}
    </picture>
  )
}
