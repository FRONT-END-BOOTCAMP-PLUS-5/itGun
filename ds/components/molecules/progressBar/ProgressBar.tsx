import React from "react"
import type { ProgressBarProps, ProgressBarVariant } from "./ProgressBar.types"
import { progressBarVariants } from "@/ds/styles/tokens/progressBar/variants"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"

const resolveVariant = (
  variant?: ProgressBarProps["variant"]
): { fillClass: string; borderClass: string; textClass: string } => {
  const key = typeof variant === "string" ? variant : "primary"
  const token = (progressBarVariants as any)[key]
  const borderClass: string = token?.border ?? "border-[var(--color-primary)]"
  const fillClass: string = token?.bg ?? "bg-[var(--color-primary)]"
  const textClass: string = borderClass.replace(/^border-/, "text-")
  return { fillClass, borderClass, textClass }
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

  const { fillClass, borderClass, textClass } = resolveVariant(variant)

  return (
    <div className="w-full">
      {/* 헤더: 좌측 라벨, 우측 카운터 */}
      <div className="mb-2 flex w-full items-center justify-between">
        <S1 variant="primary" className={textClass}>
          {label ?? ""}
        </S1>
        {showCounter && (
          <S1 variant="primary" className={textClass}>
            {safeValue} / {safeMax}
          </S1>
        )}
      </div>

      {/* 바 본체 */}
      <div className="flex w-full items-center gap-2 select-none">
        <S1 variant="primary" className={textClass}>
          [
        </S1>
        <div className="flex w-full gap-2">
          {Array.from({ length: clampedSteps }).map((_, idx) => {
            const isFilled = idx < filledCount
            return (
              <div
                key={idx}
                className={[
                  "h-[15px] flex-1 border-2",
                  borderClass,
                  isFilled ? fillClass : "bg-transparent",
                ].join(" ")}
              />
            )
          })}
        </div>
        <S1 variant="primary" className={textClass}>
          ]
        </S1>
      </div>
    </div>
  )
}

export default ProgressBar
