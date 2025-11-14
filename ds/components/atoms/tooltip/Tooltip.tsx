import React from "react"
import { TooltipProps } from "./Tooltip.types"
import { tooltipVariants } from "@/ds/styles/tokens/tooltip/variants"
import { tooltipSizes } from "@/ds/styles/tokens/tooltip/size"
import { tooltipPosition } from "@/ds/styles/tokens/tooltip/position"
import { tooltipArrowPosition } from "@/ds/styles/tokens/tooltip/arrowPosition"

const Tooltip: React.FC<TooltipProps> = ({
  label,
  variant = "secondary-blue",
  position = "top",
  size = "md",
  className,
}) => {
  const tooltipSize = tooltipSizes[size]
  const variantClasses = tooltipVariants[variant]

  const arrowColorStyle = {
    top: { borderTopColor: variantClasses.arrow },
    bottom: { borderBottomColor: variantClasses.arrow },
    left: { borderLeftColor: variantClasses.arrow },
    right: { borderRightColor: variantClasses.arrow },
  }

  const baseClasses = [
    "absolute",
    "z-10",
    "w-max",
    tooltipPosition[position],
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim()

  const arrowBaseClasses = [
    "absolute",
    "h-0",
    "w-0",
    tooltipArrowPosition[position],
  ]
    .join(" ")
    .trim()

  const bodyClasses = ["rounded-md", "shadow-lg", variantClasses.bg]
    .join(" ")
    .trim()

  const textClasses = ["whitespace-nowrap", tooltipSize, variantClasses.text]
    .join(" ")
    .trim()

  return (
    <div role="tooltip" className={baseClasses}>
      <div className={arrowBaseClasses} style={arrowColorStyle[position]} />
      <div className={bodyClasses}>
        <p className={textClasses}>{label}</p>
      </div>
    </div>
  )
}

export default Tooltip
