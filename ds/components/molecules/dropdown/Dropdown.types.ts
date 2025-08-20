import { DropdownSize } from "@/ds/styles/tokens/dropdown/size"
export type DropdownOption = {
  label: string
  value: string | number
}

export type DropdownProps = {
  size?: DropdownSize
  options: DropdownOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  placeholder?: string
}
