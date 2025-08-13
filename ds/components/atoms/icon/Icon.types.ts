import { svgList } from "@/static/svgs/svgList"

export const colorMap = {
  primary: "#3d2c4b",
  secondary: "#6b5c7c",
  "secondary-purple": "#cdc1ff",
  "secondary-pink": "#ffccea",
  "secondary-blue": "#bfecff",
  "secondary-yellow": "#fff6e3",
  "white-100": "#ffffff",
  "white-200": "#fdfdfd",
  disable: "#b4afc3",
  error: "#ff5a5a",
  accent: "#f86d92",
  success: "#5bd3a0",
  info: "#5caeff",
} as const

export type ColorName = keyof typeof colorMap
export type Color = ColorName | string

export interface IconProps {
  name: keyof typeof svgList
  size?: number
  color?: Color
  strokeWidth?: number
  fillColor?: Color
}
