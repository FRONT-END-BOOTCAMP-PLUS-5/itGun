import React from "react"
import type { ProgressBarProps, ProgressBarVariant } from "./ProgressBar.types"
import { progressBarVariants } from "@/ds/styles/tokens/progressBar/variants"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"

const resolveVariant = (
  variant?: ProgressBarProps["variant"]
): ProgressBarVariant => {
  if (!variant) return { borderColor: "#3D2C4B", fillColor: "#3D2C4B" }
  if (typeof variant === "string") {
    return (
      progressBarVariants[variant] ?? {
        borderColor: "#3D2C4B",
        fillColor: "#3D2C4B",
      }
    )
  }
  return variant
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

  const { borderColor, fillColor } = resolveVariant(variant)

  return (
    <div className="w-full">
      {/* 헤더: 좌측 라벨, 우측 카운터 */}
      <div className="mb-2 flex w-full items-center justify-between">
        <S1 variant="primary" style={{ color: borderColor }}>
          {label ?? ""}
        </S1>
        {showCounter && (
          <S1 variant="primary" style={{ color: borderColor }}>
            {safeValue} / {safeMax}
          </S1>
        )}
      </div>

      {/* 바 본체 */}
      <div className="flex w-full items-center gap-2 select-none">
        <S1 variant="primary" style={{ color: borderColor }}>
          [
        </S1>
        <div className="flex w-full gap-2">
          {Array.from({ length: clampedSteps }).map((_, idx) => {
            const isFilled = idx < filledCount
            return (
              <div
                key={idx}
                className="flex-1"
                style={{
                  height: `12px`,
                  backgroundColor: isFilled ? fillColor : "transparent",
                  border: `2px solid ${borderColor}`,
                }}
              />
            )
          })}
        </div>
        <S1 variant="primary" style={{ color: borderColor }}>
          ]
        </S1>
      </div>
    </div>
  )
}

export default ProgressBar
