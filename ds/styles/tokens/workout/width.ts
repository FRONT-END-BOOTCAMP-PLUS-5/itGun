export const workoutWidths = {
 "2xs": "w-2xs",
  xs: "w-xs",
  sm: "w-sm",
  md: "w-md",
  lg: "w-lg",
  xl: "w-xl",
  auto: "w-auto",
  dvw: "w-dvw",
  lvw: "w-lvw",
  svw: "w-svw",
  fit: "w-fit",

} as const

export type WorkoutWidth = keyof typeof workoutWidths
