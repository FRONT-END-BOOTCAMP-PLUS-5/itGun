"use client"

import Icon from "@/ds/components/atoms/icon/Icon"
import { IconProps } from "@/ds/components/atoms/icon/Icon.types"
import { C1, H1 } from "@/ds/components/atoms/text/TextWrapper"
import { WorkoutTypeSelectorProps } from "./type"
import { CalIconType } from "../types"

const WorkoutTypeSelector = ({
  calIconType,
  setCalIconType,
}: WorkoutTypeSelectorProps) => {
  const IconTypes = [
    {
      type: "cardio",
      icon: "hearts",
      label: "유산소",
      color: "error",
    },
    {
      type: "upper",
      icon: "arm",
      label: "상체",
      color: "success",
    },
    {
      type: "lower",
      icon: "leg",
      label: "하체",
      color: "secondary-blue",
    },
  ]

  return (
    <section className="flex flex-col items-center justify-center gap-7">
      <H1>오늘은 무슨 데이?</H1>
      <ul className="flex items-center gap-6">
        {IconTypes.map(({ type, icon, label, color }) => (
          <li
            key={type}
            className="flex flex-col items-center gap-4"
            onClick={() => setCalIconType(type as CalIconType)}
          >
            <div
              className={`border-primary flex size-12 items-center justify-center rounded-full border-1 ${
                calIconType === type && "border-2"
              }`}
            >
              <Icon
                name={icon as IconProps["name"]}
                size={28}
                fillColor={calIconType === type ? color : ""}
              />
            </div>
            <C1 fontWeight={calIconType === type ? "bold" : undefined}>
              {label}
            </C1>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WorkoutTypeSelector
