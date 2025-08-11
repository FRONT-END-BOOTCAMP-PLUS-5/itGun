import React from "react"

export type DropdownOption = {
  label: string
  value: string | number
}

export type DropdownProps = {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outlined"
  options: DropdownOption[]
  value?: string | number
  placeholder?: string
  onChange?: (value: string | number) => void
  disabled?: boolean
}

const sizeStyle = {
  sm: { fontSize: "14px", height: "32px" },
  md: { fontSize: "16px", height: "40px" },
  lg: { fontSize: "18px", height: "48px" },
}

const Dropdown = ({
  size = "md",
  variant = "default",
  options,
  value,
  placeholder = "",
  onChange,
  disabled = false,
}: DropdownProps) => {
  return (
    <div
      style={{
        borderBottom: "2px solid #6B617A",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "240px",
        position: "relative",
        background: "#fff",
      }}
    >
      <select
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          background: "transparent",
          color: "#6B617A",
          padding: "16px 32px 6px 0",
          appearance: "none",
          ...sizeStyle[size],
        }}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span
        style={{
          position: "absolute",
          right: 0,
          pointerEvents: "none",
          color: "#6B617A",
        }}
      >
        ▼
      </span>
    </div>
  )
}

export default Dropdown
