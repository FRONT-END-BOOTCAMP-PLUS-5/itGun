"use client"

import React, { useEffect, useRef, useState } from "react"
import type { DropdownOption, DropdownProps } from "./Dropdown.types"
import Icon from "../../atoms/icon/Icon"
import { dropdownSize } from "../../../styles/tokens/dropdown/size"
import { B1 } from "../../atoms/text/TextWrapper"

export const Dropdown: React.FC<DropdownProps> = ({
  size = "md",
  options,
  value,
  onChange,
  placeholder = "선택해주세요",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    value || null
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value)
    onChange?.(option.value)
    setIsOpen(false)
  }

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`border-secondary flex w-full items-center justify-between border-b ${dropdownSize[size]}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <B1 variant="secondary">
          {selectedOption ? selectedOption.label : placeholder}
        </B1>
        <div
          className={`ml-2 flex h-6 w-6 transform items-center justify-center transition-transform duration-0 ${isOpen ? "rotate-180" : ""}`}
        >
          <Icon
            name="downArrow"
            color="secondary"
            fillColor="secondary"
            size={12}
            viewBox="0 0 14 8" // 실제 path 크기에 맞게 조정
          />
        </div>
      </button>

      {isOpen && (
        <ul className="bg-white-200 border-secondary absolute z-10 max-h-[97px] w-full overflow-y-auto border border-t-0">
          {options.map((option) => (
            <li
              key={option.value}
              className="bg-white-200 text-secondary px-2 py-1"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
