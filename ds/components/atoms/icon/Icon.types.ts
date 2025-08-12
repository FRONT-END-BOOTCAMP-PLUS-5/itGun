import { svgList } from "@/static/svgs/svgList"

export interface IconProps {
  name: keyof typeof svgList
  size?: number
  color?: string
  strokeWidth?: number
  fillColor?: string
}
