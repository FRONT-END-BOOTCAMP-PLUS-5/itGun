export type DropdownOption = {
  label: string
  value: string | number
}

export type DropdownSize = "sm" | "md" | "lg"

export type DropdownProps = {
  size?: DropdownSize
  options: DropdownOption[]
  value?: string | number
  placeholder?: string
  onChange?: (value: string | number) => void
  disabled?: boolean
}
