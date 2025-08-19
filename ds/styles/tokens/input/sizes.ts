export const inputSizes = {
  xs: "w-[24px] h-[19px] text-[10px]",
  sm: "w-[37px] h-[24px] text-xs",
  md: "w-[48px] h-[28px] text-xs",
  lg: "w-[54px] h-[30px] text-base",
  xl: "w-[64px] h-[36px] text-xl",
} as const

export type InputSize = keyof typeof inputSizes
