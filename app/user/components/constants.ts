import { DropdownOption } from "@/ds/components/molecules/dropdown/Dropdown.types"

export const numberOptions: DropdownOption[] = Array.from(
  { length: 81 },
  (_, i) => {
    const num = i + 10
    return { label: String(num), value: num }
  }
)

export const genderOptions: DropdownOption[] = [
  { label: "남", value: "male" },
  { label: "여", value: "female" },
  { label: "선택하지 않음", value: "none" },
]
