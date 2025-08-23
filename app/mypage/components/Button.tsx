"use client"

import React from "react"
import { Button as DSButton } from "@/ds/components/atoms/button/Button"
import type { ButtonProps } from "@/ds/components/atoms/button/Button.types"
import Icon from "@/ds/components/atoms/icon/Icon"
import { svgList } from "@/static/svgs/svgList"

interface CustomButtonProps extends Omit<ButtonProps, "variant" | "children"> {
  variant?: ButtonProps["variant"] | "save" | "complete"
  children?: React.ReactNode
}

export const Button = ({
  variant = "primary",
  onClick,
  children,
  ...props
}: CustomButtonProps) => {
  console.log("svgList.save:", svgList.save)
  const customVariants = {
    save: "bg-[var(--color-primary)] text-white rounded-lg",
    complete: "bg-blue-400 text-white rounded-lg",
  }

  if (customVariants[variant as keyof typeof customVariants]) {
    return (
      <DSButton
        {...props}
        onClick={onClick}
        className={`${customVariants[variant as keyof typeof customVariants]} ${props.className || ""}`}
      >
        <div className="flex items-center justify-center gap-2">
          {variant === "save" && (
            <>
              <span>저장</span>
              <Icon name="save" size={20} color="white" />
            </>
          )}
          {variant === "complete" && children}
        </div>
      </DSButton>
    )
  }

  return (
    <DSButton
      variant={variant as ButtonProps["variant"]}
      onClick={onClick}
      {...props}
    >
      {children}
    </DSButton>
  )
}

export type { ButtonProps }
