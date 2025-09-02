import { DropdownOption } from "@/ds/components/molecules/dropdown/Dropdown.types"

export const numberOptions: DropdownOption[] = Array.from(
  { length: 81 },
  (_, i) => {
    const num = i + 10
    return { label: String(num), value: num }
  }
)

export const genderOptions: DropdownOption[] = [
  { label: "남", value: "남" },
  { label: "여", value: "여" },
  { label: "선택하지 않음", value: "선택하지 않음" },
]
