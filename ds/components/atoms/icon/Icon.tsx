import { svgList } from "@/static/svgs/svgList"
import { IconProps } from "./Icon.types"

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#3D2C4B",
  fillColor,
  strokeWidth = 1,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={color}
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      {typeof svgList[name] === "function"
        ? svgList[name](fillColor ? fillColor : color)
        : svgList[name]}
    </svg>
  )
}

export default Icon
