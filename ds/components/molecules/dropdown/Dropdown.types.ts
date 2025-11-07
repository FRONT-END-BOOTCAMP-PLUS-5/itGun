import { DropdownSize } from "@/ds/styles/tokens/dropdown/size"

export type DropdownOption = {
  label: string
  value: string | number
}

export interface DropdownProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "size" | "onChange"
  > {
  size?: DropdownSize
  onChange?: (value: string | number) => void
  options: DropdownOption[]
  value?: string | number
  placeholder?: string
  readOnly?: boolean
  className?: string
}
