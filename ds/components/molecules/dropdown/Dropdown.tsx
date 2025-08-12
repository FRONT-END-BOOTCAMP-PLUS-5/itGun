import React from "react"
import type { DropdownOption, DropdownProps } from "./Dropdown.types"
import Icon from "../../atoms/icon/Icon"

const sizeClassBySize: Record<NonNullable<DropdownProps["size"]>, string> = {
  sm: "text-[16px] h-21",
  md: "text-[16px] h-[30px]",
  lg: "text-[16px] h-42",
}

const Dropdown = ({
  size = "md",
  options,
  value,
  placeholder = "",
  onChange,
  disabled = false,
}: DropdownProps) => {
  const sizeClasses = sizeClassBySize[size]

  return (
    <div className="relative flex w-[240px] flex-row items-center border-b-2 border-[#6B617A] bg-white">
      <select
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={[
          "w-full appearance-none border-none bg-transparent text-[#6B617A] outline-none",
          "pt-[3px] pr-8 pb-[6px] pl-0 leading-[21px]",
          sizeClasses,
        ].join(" ")}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt: DropdownOption) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 rotate-90 text-[#6B617A]">
        <Icon name="rightArrow" size={16} color="#6B617A" />
      </span>
    </div>
  )
}

export default Dropdown
