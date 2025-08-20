import React, { useEffect, useRef, useState } from "react"
import type { DropdownOption, DropdownProps } from "./Dropdown.types"
import Icon from "../../atoms/icon/Icon"
import { dropdownSize } from "../../../styles/tokens/dropdown/size"

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
        className={`flex w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-left shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${dropdownSize[size]}`}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <span
          className={`flex-1 ${selectedOption ? "text-gray-900" : "text-gray-500"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="relative ml-2 h-6 w-6">
          <div className="absolute top-[9px] left-[9.41px]">
            <Icon
              name="downArrow"
              color="primary"
              fillColor="primary"
              size={24}
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              className="block w-full px-3 py-2 text-left text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
