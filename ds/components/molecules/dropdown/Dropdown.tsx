import React, { useEffect, useMemo, useRef, useState } from "react"
import type { DropdownOption, DropdownProps } from "./Dropdown.types"
import Icon from "../../atoms/icon/Icon"

const sizeClassBySize: Record<NonNullable<DropdownProps["size"]>, string> = {
  sm: "text-[16px] h-21",
  md: "text-[16px] h-[30px]",
  lg: "text-[16px] h-42",
}

const Dropdown = ({
  size = "md",
  options,
  value,
  placeholder = "",
  onChange,
  disabled = false,
}: DropdownProps) => {
  const sizeClasses = sizeClassBySize[size]

  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const allNumeric = useMemo(
    () => options.every((opt) => typeof opt.value === "number"),
    [options]
  )

  const unitSuffix = useMemo(() => {
    if (!allNumeric || options.length === 0) return ""
    const sample = options[0].label
    const suffix = sample.replace(/^[-+]?\d+(?:\.\d+)?\s*/, "")
    return suffix
  }, [allNumeric, options])

  const groupedRanges = useMemo(() => {
    if (!allNumeric) return [] as { label: string; value: string }[]
    if (options.length === 0) return []

    const sorted = [...options].sort(
      (a, b) => (a.value as number) - (b.value as number)
    )

    const groups: { label: string; value: string }[] = []
    const n = sorted.length

    for (let i = 0; i < 4; i += 1) {
      const startIdx = Math.floor((i * n) / 4)
      const endIdxRaw = Math.floor(((i + 1) * n) / 4) - 1
      if (startIdx >= n) continue
      const endIdx = Math.max(startIdx, Math.min(endIdxRaw, n - 1))

      const startVal = sorted[startIdx].value as number
      const endVal = sorted[endIdx].value as number

      const label = `${startVal}${unitSuffix} ~ ${endVal}${unitSuffix}`
      const value = `${startVal}-${endVal}`
      groups.push({ label, value })
    }

    return groups
  }, [allNumeric, options, unitSuffix])

  const selectedLabel = useMemo(() => {
    const matched = options.find((opt) => opt.value === value)
    if (matched) return matched.label
    if (typeof value === "string" && value.includes("-")) {
      // value가 범위 문자열인 경우 그대로 노출하거나 단위 붙여서 노출
      if (unitSuffix) {
        const [s, e] = value.split("-")
        if (s && e && !Number.isNaN(Number(s)) && !Number.isNaN(Number(e))) {
          return `${Number(s)}${unitSuffix} ~ ${Number(e)}${unitSuffix}`
        }
      }
      return value
    }
    return ""
  }, [options, unitSuffix, value])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (containerRef.current.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (val: string | number) => {
    onChange?.(val)
    setOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className="relative flex w-[333px] flex-row items-center border-b-2 border-[var(--color-secondary)] bg-white"
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        className={[
          "w-full appearance-none border-none bg-transparent text-left text-[var(--color-secondary)] outline-none",
          "pt-[3px] pr-8 pb-[6px] pl-0 leading-[21px]",
          sizeClasses,
        ].join(" ")}
      >
        {selectedLabel || placeholder}
      </button>
      <span className="pointer-events-none absolute right-0 rotate-0 text-[var(--color-secondary)]">
        <Icon name="downArrow" size={24} color="var[(--color-secondary)]" />
      </span>

      {open && !disabled && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-md border border-[var(--color-secondary)] bg-white p-2 shadow-md">
          {allNumeric ? (
            <div className="flex h-32 flex-col overflow-auto pr-1">
              {groupedRanges.map((grp) => (
                <button
                  key={grp.value}
                  type="button"
                  onClick={() => handleSelect(grp.value)}
                  className={[
                    "w-full truncate rounded px-2 py-2 text-left text-[14px] leading-5",
                    typeof value === "string" && value === grp.value
                      ? "bg-[var(--color-white-200)] text-[var(--color-primary)]"
                      : "",
                  ].join(" ")}
                  title={grp.label}
                >
                  {grp.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex h-32 flex-col overflow-auto pr-1">
              {options.map((opt: DropdownOption) => {
                const isSelected = opt.value === value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={[
                      "w-full truncate rounded px-2 py-2 text-left text-[14px] leading-5",
                      isSelected
                        ? "bg-[var(--color-white-200)] text-[var(--color-primary)]"
                        : "",
                    ].join(" ")}
                    title={opt.label}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dropdown
