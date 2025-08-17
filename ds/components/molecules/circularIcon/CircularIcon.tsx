import Icon from "@/ds/components/atoms/icon/Icon"
import { CircularIconProps } from "./CircularIcon.types"
import { circularIconVariants } from "@/ds/styles/tokens/circularIcon/variants"

const CircularIcon: React.FC<CircularIconProps> = ({
  iconName,
  iconColor,
  iconFilledColor,
  iconSize = 24,
  variant = "primary",
}) => {
  const containerSize = iconSize + 16
  const baseClasses = [
    circularIconVariants[variant],
    "rounded-full",
    "border-2",
    "border-[var(--color-primary)]",
    "aspect-square",
    "flex",
    "items-center",
    "justify-center",
    variant !== "disable" && "cursor-pointer",
  ]
    .join(" ")
    .trim()

  return (
    <div
      className={baseClasses}
      style={{
        width: `${containerSize}px`,
      }}
    >
      <Icon
        name={iconName}
        size={iconSize}
        color={iconColor}
        fillColor={iconFilledColor}
      />
    </div>
  )
}

export default CircularIcon
