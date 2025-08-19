export type DropdownOption = {
  label: string
  value: string | number
}

export type DropdownProps = {
  size?: "sm" | "md" | "lg"
  options: DropdownOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  placeholder?: string
}
