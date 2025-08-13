export const buttonSizes = {
  xs: "w-fit px-[4px] py-[2px] text-sm",
  sm: "w-[150px] h-[40px] px-[8px] py-[6px] text-base",
  md: "w-[200px] h-[58px] py-[8px] text-base",
  lg: "w-[220px] h-[60px] py-[8px] text-lg",
  lx: "w-[260px] h-[71px] px-[30px] py-[10px] text-lg",
} as const

export type ButtonSize = keyof typeof buttonSizes
