import { svgList } from "@/static/svgs/svgList"
import { Color } from "@/ds/components/atoms/icon/Icon.types"
import { CircularIconVariant } from "@/ds/styles/tokens/circularIcon/variants"

export interface CircularIconProps {
  iconName: keyof typeof svgList
  iconColor?: Color
  iconFilledColor?: Color
  iconSize?: number
  variant?: CircularIconVariant
}
