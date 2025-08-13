import { svgList } from "@/static/svgs/svgList"
import { IconProps, colorMap, Color, ColorName } from "./Icon.types"

const isColorName = (color: Color): color is ColorName => {
  return color in colorMap
}

const resolveColor = (color: Color): string => {
  if (isColorName(color)) {
    return colorMap[color]
  }
  return color
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "primary",
  fillColor,
  strokeWidth = 1,
}) => {
  const resolvedColor = resolveColor(color)
  const resolvedFillColor = fillColor ? resolveColor(fillColor) : "#ffffff"

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={resolvedColor}
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: resolvedColor }}
    >
      {typeof svgList[name] === "function"
        ? svgList[name](resolvedFillColor)
        : svgList[name]}
    </svg>
  )
}

export default Icon
