import React from "react"
import {
  WorkoutProps,
  WorkoutSetData,
  WorkoutSetDataField,
  WorkoutType,
} from "@/ds/components/molecules/workout/Workout.types"
import { workoutVariants } from "@/ds/styles/tokens/workout/variants"
import { gridColumns, GridColumn } from "@/ds/styles/tokens/workout/gridColumns"
import { B2, C2 } from "@/ds/components/atoms/text/TextWrapper"
import { workoutWidths } from "@/ds/styles/tokens/workout/width"
import { workoutFields } from "@/ds/styles/tokens/workout/fields"
import { Input } from "@/ds/components/atoms/input/Input"
import Text from "@/ds/components/atoms/text/Text"
import Icon from "@/ds/components/atoms/icon/Icon"
import { Button } from "@/ds/components/atoms/button/Button"

const Workout: React.FC<WorkoutProps> = ({
  variant = "primary",
  width = "md",
  isFullWidth = false,
  title,
  type,
  seq,
  data,
  isEditable = false,
  onAddSet,
  onRemoveSet,
  onRemoveExercise,
  onDataChange,
  onTypeChange,
  className,
  ...props
}) => {
  const variantConfig = workoutVariants[variant]

  const widthClass = isFullWidth
    ? "w-full"
    : width
      ? `${workoutWidths[width]}`
      : "w-fit"

  const fieldConfig = workoutFields[type]
  const cols = isEditable
    ? fieldConfig.columns.length + 1
    : fieldConfig.columns.length
  const gridColumnsClass = gridColumns[cols as GridColumn] || "grid-cols-3"

  const typeOrder: WorkoutType[] = [
    "weight-reps",
    "reps",
    "distance-duration",
    "duration",
  ]
  const handleTypeChange = () => {
    const currentIndex = typeOrder.indexOf(type)
    const nextIndex = (currentIndex + 1) % typeOrder.length
    const nextType = typeOrder[nextIndex]
    onTypeChange?.(nextType, seq || 0)
  }

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

  const renderField = (
    setData: WorkoutSetData,
    field: WorkoutSetDataField,
    index: number,
    fieldIndex: number
  ) => {
    const value = setData[field]

    if (field === "setCount") {
      return (
        <C2 key={`${field}-${index}`} className="self-center text-center">
          {index + 1}
        </C2>
      )
    }

    // 시간 필드
    if (field === "durationSeconds") {
      if (isEditable) {
        return (
          <div
            key={`${field}-${index}`}
            className="flex items-center justify-center"
          >
            <Input
              size="sm"
              placeholder="분"
              inputMode="numeric"
              className="scale-[62.5%] text-center text-[16px]"
              value={
                Number(value) > 0
                  ? Math.floor(Number(value) / 60).toString()
                  : ""
              }
              onChange={(e) => {
                const minutes = Number(e.target.value) || 0
                const seconds = (Number(value) || 0) % 60
                onDataChange?.(index, field, minutes * 60 + seconds, seq)
              }}
            />
            <C2 className="text-center">:</C2>
            <Input
              size="sm"
              placeholder="초"
              inputMode="numeric"
              className="scale-[62.5%] text-center text-[16px]"
              value={Number(value) > 0 ? (Number(value) % 60).toString() : ""}
              onChange={(e) => {
                const seconds = Number(e.target.value) || 0
                const minutes = Math.floor((Number(value) || 0) / 60)
                onDataChange?.(index, field, minutes * 60 + seconds, seq)
              }}
            />
          </div>
        )
      } else {
        const minutes = Math.floor((Number(value) || 0) / 60)
        const seconds = (Number(value) || 0) % 60
        return (
          <C2 key={`${field}-${index}`} className="flex self-center justify-center">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </C2>
        )
      }
    }

    if (isEditable) {
      return (
        <div
          className="flex items-center justify-center"
          key={`${field}-${index}`}
        >
          <Input
            size="sm"
            placeholder={fieldConfig.placeholders[fieldIndex] || ""}
            className="scale-[62.5%] text-center text-[16px]"
            inputMode="numeric"
            value={value || ""}
            onChange={(e) => {
              const inputValue = e.target.value
              const numberRegex = /^[0-9]{0,3}$/
              if (numberRegex.test(inputValue)) {
                onDataChange?.(index, field, inputValue, seq)
              }
            }}
          />
        </div>
      )
    } else {
      return (
        <C2 key={`${field}-${index}`} className="self-center text-center">
          {value || ""}
        </C2>
      )
    }
  }

  return (
    <div className={baseClasses} {...props}>
      <div className="flex items-center justify-between">
        <B2 className={variantConfig.titleColor} fontWeight="bold">
          {title}
        </B2>
        <div className="mr-[-9px] flex items-center justify-center">
          {isEditable && onTypeChange && (
            <Button variant="ghost" size="xs" onClick={handleTypeChange}>
              <Icon name="setting" size={25} />
            </Button>
          )}

          {isEditable && onRemoveExercise && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onRemoveExercise()}
            >
              <Icon name="remove" size={30} />
            </Button>
          )}
        </div>
      </div>
      <div className="items-evenly flex flex-col justify-center gap-2 p-1">
        <div
          className={`grid ${gridColumnsClass} gap-4 ${isEditable ? "mb-4" : ""}`}
        >
          {fieldConfig.columns.map((column) => (
            <C2 key={column} className="text-center">
              {column}
            </C2>
          ))}
          {isEditable && <div></div>}

          {data.map((setData, index) => (
            <React.Fragment key={setData.setCount}>
              {fieldConfig.fields.map((field, fieldIndex) =>
                renderField(
                  setData,
                  field as WorkoutSetDataField,
                  index,
                  fieldIndex
                )
              )}

              {isEditable && onRemoveSet && (
                <Button
                  variant="ghost"
                  size="xs"
                  className="self-center justify-self-center"
                  onClick={() => onRemoveSet(index, seq)}
                >
                  <Icon name="remove" size={30} />
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {isEditable && onAddSet && (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="xs"
              className="self-center justify-self-center"
              onClick={() => onAddSet(seq)}
            >
              <Icon name="plus" />
              <Text
                size="text-sm"
                variant="primary"
                className="self-center justify-self-center text-center"
              >
                세트 추가
              </Text>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Workout
