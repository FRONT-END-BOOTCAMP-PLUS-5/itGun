import React from "react"
import { Dropdown as DSDropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import type {
  DropdownProps,
  DropdownOption,
} from "@/ds/components/molecules/dropdown/Dropdown.types"

interface CustomDropdownProps extends DropdownProps {
  className?: string
  variant?: "primary" | "secondary"
}

export const Dropdown: React.FC<CustomDropdownProps> = ({
  className,
  variant = "secondary",
  ...props
}) => {
  const variantStyles = {
    primary:
      "border-b-2 border-[var(--color-primary)] focus:border-[var(--color-primary)]",
    secondary:
      "border-b border-[var(--color-secondary)] focus:border-[var(--color-secondary)]",
  }

  return (
    <div
      className={`h-[30px] w-[330px] bg-white ${variantStyles[variant]} ${className || ""}`}
    >
      <DSDropdown {...props} />
    </div>
  )
}

export type { DropdownProps, DropdownOption }
