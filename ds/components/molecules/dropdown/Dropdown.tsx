"use client"

import React from "react"
import Icon from "../../atoms/icon/Icon"
import { dropdownSize } from "../../../styles/tokens/dropdown/size"
import { DropdownProps } from "./Dropdown.types"

export const Dropdown: React.FC<DropdownProps> = ({
  size = "md",
  options,
  value,
  onChange,
  placeholder = "선택해주세요",
  readOnly = false,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }

  const selectClassName = `
    w-full border-b border-secondary 
    bg-transparent 
    text-secondary
    appearance-none
    focus:outline-none
    ${dropdownSize[size]}
    ${readOnly ? "cursor-default" : "cursor-pointer"}
    ${className || ""}
  `.trim()

  return (
    <div className="relative flex w-full">
      <select
        name={props?.name ? props.name : "dropdown"}
        value={value || ""}
        onChange={handleChange}
        disabled={readOnly}
        className={selectClassName}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!readOnly && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Icon
            name="downArrow"
            color="secondary"
            fillColor="secondary"
            size={12}
            viewBox="0 0 14 8"
          />
        </div>
      )}
    </div>
  )
}
