import React from "react"
import type { ProgressBarProps, ProgressBarVariant } from "./ProgressBar.types"
import { progressBarVariants } from "@/ds/styles/tokens/progressBar/variants"
import { B2 } from "@/ds/components/atoms/text/TextWrapper"

const resolveVariant = (
  variant?: ProgressBarProps["variant"]
): {
  style?: ProgressBarVariant
  classes?: { fillClass: string; borderClass: string; textClass: string }
} => {
  if (!variant) {
    return { style: { borderColor: "#3D2C4B", fillColor: "#3D2C4B" } }
  }
  if (typeof variant === "string") {
    const token = (progressBarVariants as any)[variant]
    if (token) {
      const borderClass: string =
        token.border ?? "border-[var(--color-primary)]"
      const fillClass: string = token.bg ?? "bg-[var(--color-primary)]"
      const textClass: string = borderClass.replace(/^border-/, "text-")
      return { classes: { fillClass, borderClass, textClass } }
    }
    return { style: { borderColor: "#3D2C4B", fillColor: "#3D2C4B" } }
  }
  return { style: variant }
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  max,
  value,
  steps,
  variant,
  label,
  showCounter = true,
}) => {
  const safeMax = Math.max(1, max)
  const safeValue = Math.max(0, Math.min(value, safeMax))
  const clampedSteps = Math.max(1, steps)
  const filledCount = Math.round((safeValue / safeMax) * clampedSteps)

  const resolved = resolveVariant(variant)
  const borderColor = resolved.style?.borderColor
  const fillColor = resolved.style?.fillColor
  const fillClass = resolved.classes?.fillClass
  const borderClass = resolved.classes?.borderClass
  const textClass = resolved.classes?.textClass

  return (
    <div className="w-full">
      {/* 헤더: 좌측 라벨, 우측 카운터 */}
      <div className="mb-2 flex w-full items-center justify-between">
        <B2
          variant="primary"
          className={textClass}
          style={borderColor ? { color: borderColor } : undefined}
        >
          {label ?? ""}
        </B2>
        {showCounter && (
          <B2
            variant="primary"
            className={textClass}
            style={borderColor ? { color: borderColor } : undefined}
          >
            {safeValue} / {safeMax}
          </B2>
        )}
      </div>

      {/* 바 본체 */}
      <div className="flex w-full items-center gap-2 select-none">
        <B2
          variant="primary"
          className={textClass}
          style={borderColor ? { color: borderColor } : undefined}
        >
          [
        </B2>
        <div className="flex w-full gap-2">
          {Array.from({ length: clampedSteps }).map((_, idx) => {
            const isFilled = idx < filledCount
            return (
              <div
                key={idx}
                className={[
                  "flex-1 border-2",
                  borderClass ?? "",
                  isFilled ? (fillClass ?? "") : "bg-transparent",
                ].join(" ")}
                style={
                  borderClass
                    ? { height: `12px` }
                    : {
                        height: `12px`,
                        backgroundColor: isFilled ? fillColor : "transparent",
                        border: `2px solid ${borderColor}`,
                      }
                }
              />
            )
          })}
        </div>
        <B2
          variant="primary"
          className={textClass}
          style={borderColor ? { color: borderColor } : undefined}
        >
          ]
        </B2>
      </div>
    </div>
  )
}

export default ProgressBar
