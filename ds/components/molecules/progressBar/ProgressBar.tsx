import React from "react"
import type { ProgressBarProps } from "./ProgressBar.types"

const ProgressBar: React.FC<ProgressBarProps> = ({
  max,
  value,
  steps,
  size = 12,
  variant = {
    borderColor: "#3D2C4B",
    fillColor: "#3D2C4B",
  },
  onChange,
}) => {
  const safeMax = Math.max(1, max)
  const safeValue = Math.max(0, Math.min(value, safeMax))
  const clampedSteps = Math.max(1, steps)
  const filledCount = Math.round((safeValue / safeMax) * clampedSteps)

  const handleClick = (index: number) => {
    if (!onChange) return
    const ratio = (index + 1) / clampedSteps
    const nextValue = Math.max(
      0,
      Math.min(safeMax, Math.round(ratio * safeMax))
    )
    onChange(nextValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onChange) return
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault()
      onChange(Math.min(safeMax, safeValue + 1))
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault()
      onChange(Math.max(0, safeValue - 1))
    } else if (e.key === "Home") {
      e.preventDefault()
      onChange(0)
    } else if (e.key === "End") {
      e.preventDefault()
      onChange(safeMax)
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-2 select-none">
        {/* 여는 대괄호 */}
        <span className="text-[#3D2C4B]" style={{ color: variant.borderColor }}>
          [
        </span>

        {/* 스텝 바 */}
        <div
          className="flex w-full gap-2 focus:outline-none"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={safeMax}
          aria-valuenow={safeValue}
          tabIndex={onChange ? 0 : -1}
          onKeyDown={handleKeyDown}
        >
          {Array.from({ length: clampedSteps }).map((_, idx) => {
            const isFilled = idx < filledCount
            return (
              <div
                key={idx}
                className="flex-1 cursor-pointer"
                onClick={() => handleClick(idx)}
                style={{
                  height: `${size}px`,
                  backgroundColor: isFilled ? variant.fillColor : "transparent",
                  border: `2px solid ${variant.borderColor}`,
                }}
              />
            )
          })}
        </div>

        {/* 닫는 대괄호 */}
        <span className="text-[#3D2C4B]" style={{ color: variant.borderColor }}>
          ]
        </span>
      </div>
    </div>
  )
}

export default ProgressBar
