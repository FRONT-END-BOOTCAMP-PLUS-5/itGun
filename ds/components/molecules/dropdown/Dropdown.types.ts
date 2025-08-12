export type DropdownOption = {
  label: string
  value: string | number
}

export type DropdownSize = "sm" | "md" | "lg"

export type DropdownProps = {
  size?: DropdownSize
  // outlined는 지원하지 않음. default만 허용
  variant?: "default"
  options: DropdownOption[]
  value?: string | number
  placeholder?: string
  onChange?: (value: string | number) => void
  disabled?: boolean
}
