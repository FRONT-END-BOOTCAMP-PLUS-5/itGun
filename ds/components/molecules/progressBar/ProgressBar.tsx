import React from "react"
import type { ProgressBarProps, ProgressBarVariant } from "./ProgressBar.types"
import { progressBarVariants } from "@/ds/styles/tokens/progressBar/variants"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"

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

  const getCombinedClassName = () => {
    if (typeof variant === "string" && variant in progressBarVariants) {
      const variantToken = progressBarVariants[variant]
      return `${variantToken.border} ${variantToken.bg}`.trim()
    }
    if (typeof variant === "object" && variant !== null) {
      return `${variant.borderColor} ${variant.fillColor}`.trim()
    }
    // 기본값
    const defaultVariant = progressBarVariants.primary
    return `${defaultVariant.border} ${defaultVariant.bg}`.trim()
  }

  const combinedClassName = getCombinedClassName()

  return (
    <div className="w-full">
      {/* 헤더: 좌측 라벨, 우측 카운터 */}
      <div className="mb-2 flex w-full items-center justify-between">
        <S1 variant="primary">{label ?? ""}</S1>
        {showCounter && (
          <S1 variant="primary">
            {safeValue} / {safeMax}
          </S1>
        )}
      </div>

      {/* 바 본체 */}
      <div className="flex w-full items-center gap-2 select-none">
        <div className={`-su1 ${combinedClassName}`}>[</div>
        <div className="flex w-full gap-2">
          {Array.from({ length: clampedSteps }).map((_, idx) => {
            const isFilled = idx < filledCount
            return (
              <div
                key={idx}
                className={[
                  "h-[24px] flex-1 border-2",
                  combinedClassName,
                  isFilled ? combinedClassName : "bg-transparent",
                ].join(" ")}
              />
            )
          })}
        </div>
        <div className={`-b1 ${combinedClassName}`}>]</div>
      </div>
    </div>
  )
}

export default ProgressBar
