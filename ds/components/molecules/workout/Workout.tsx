import React from "react"
import { WorkoutProps, WorkoutSetData, WorkoutSetDataField, WorkoutType } from "@/ds/components/molecules/workout/Workout.types"
import { workoutVariants } from "@/ds/styles/tokens/workout/variants"
import { gridColumns, GridColumn } from "@/ds/styles/tokens/workout/gridColumns"
import { H2 } from "@/ds/components/atoms/text/TextWrapper"
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
  const cols = isEditable ? fieldConfig.columns.length + 1 : fieldConfig.columns.length
  const gridColumnsClass = gridColumns[cols as GridColumn] || "grid-cols-3"

  const typeOrder: WorkoutType[] = ["weight-reps", "reps", "distance-duration", "duration"]
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

  const renderField = (setData: WorkoutSetData, field: WorkoutSetDataField, index: number, fieldIndex: number) => {
    const value = setData[field]
    
    if (field === "setCount") {
      return (
        <Text key={`${field}-${index}`} size="text-sm" className="text-center self-center">
          {index + 1}
        </Text>
      )
    }

    // 시간 필드
    if (field === "durationSeconds") {
      if (isEditable) {
        return (
          <div key={`${field}-${index}`} className="flex justify-center items-center">
            <Input 
              size="sm" 
              placeholder="분" 
              className="text-center"
              value={Number(value) > 0 ? Math.floor(Number(value) / 60).toString() : ""}
              onChange={(e) => {
                const minutes = Number(e.target.value) || 0
                const seconds = (Number(value) || 0) % 60
                onDataChange?.(index, field, minutes * 60 + seconds, seq)
              }}
            />
            <Text size="text-sm" className="text-center">:</Text>
            <Input 
              size="sm" 
              placeholder="초" 
              className="text-center"
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
          <Text key={`${field}-${index}`} size="text-sm" className="text-center self-center">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </Text>
        )
      }
    }

    if (isEditable) {
      return (
        <div className="flex justify-center items-center">
          <Input
            key={`${field}-${index}`}
            size="sm"
            placeholder={fieldConfig.placeholders[fieldIndex] || ""}
            className="text-center"
            value={value || ""}
            onChange={(e) => onDataChange?.(index, field, e.target.value, seq)}
          />
        </div>
      )
    } else {
      return (
        <Text key={`${field}-${index}`} size="text-sm" className="text-center self-center">
          {value || ""}
        </Text>
      )
    }
  }

  return (
    <div className={baseClasses} {...props}>
      <div className="flex justify-between items-center">
        <H2 className={variantConfig.titleColor}>
          {title}
        </H2>
        {isEditable && onTypeChange && (
          <Button 
            variant="ghost" 
            size="xs"
            onClick={handleTypeChange}
            className="ml-2"
          >
            <Icon name="setting" size={25} />
          </Button>
        )}
      </div>
      <div className="p-1 flex flex-col items-evenly justify-center gap-2">
        <div className={`grid ${gridColumnsClass} gap-4 ${isEditable ? "mb-4" : ""}`}>
          {fieldConfig.columns.map(column => (
            <Text key={column} size="text-sm" className="text-center">{column}</Text>
          ))}
          {isEditable && <div></div>}
          
          {data.map((setData, index) => (
            <React.Fragment key={setData.setCount}>
              {fieldConfig.fields.map((field, fieldIndex) => 
                renderField(setData, field as WorkoutSetDataField, index, fieldIndex)
              )}
              {isEditable && onRemoveSet && (
                <Button variant="ghost" size="xs" className="self-center justify-self-center" onClick={() => onRemoveSet(index, seq)}>
                  <Icon name="remove" size={30} />
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {isEditable && onAddSet && (
          <div className="flex justify-center items-center">
            <Button variant="ghost" size="xs" className="self-center justify-self-center" onClick={() => onAddSet(seq)}>
              <Icon name="plus"/>
              <Text size="text-sm" variant="primary" className="text-center self-center justify-self-center">세트 추가</Text>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Workout
