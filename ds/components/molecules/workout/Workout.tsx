import React from "react"
import { WorkoutProps } from "@/ds/components/molecules/workout/Workout.types"
import { workoutVariants } from "@/ds/styles/tokens/workout/variants"
import { H2 } from "@/ds/components/atoms/text/TextWrapper"
import { workoutWidths } from "@/ds/styles/tokens/workout/sizes"

const Workout: React.FC<WorkoutProps> = ({
  variant = "primary",
  width,
  isFullWidth = false,
  title,
  children,
  className,
  ...props
}) => {
  const variantConfig = workoutVariants[variant]

  const widthClass = isFullWidth
    ? "w-full"
    : width
      ? `${workoutWidths[width]}`
      : "w-fit"

  const baseClasses = [
    "p-4",
    variantConfig.border,
    variantConfig.background,
    "flex",
    "flex-col",
    "gap-3",
    widthClass,
    className || "",
  ]
    .join(" ")
    .trim()

  return (
    <div className={baseClasses} {...props}>
      <H2 className={variantConfig.titleColor}>
        {title}
      </H2>
      <div className="flex flex-col items-center justify-center gap-2">
        {children}
      </div>
    </div>
  )
}

export default Workout
