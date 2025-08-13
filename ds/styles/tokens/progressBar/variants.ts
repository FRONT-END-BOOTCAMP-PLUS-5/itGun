export type ProgressBarVariantToken = {
  borderColor: string
  fillColor: string
}

export const progressBarVariants: Record<string, ProgressBarVariantToken> = {
  primary: {
    borderColor: "#3D2C4B",
    fillColor: "#3D2C4B",
  },
  outline: {
    borderColor: "#3D2C4B",
    fillColor: "transparent",
  },
}
