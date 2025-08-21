export const dropdownSize = {
  sm: "text-[16px] h-[21px]",
  md: "text-[16px] h-[30px]",
  lg: "text-[16px] h-[42px]",
} as const

export type DropdownSize = keyof typeof dropdownSize
