import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { B1 } from "@/ds/components/atoms/text/TextWrapper"
import { useCreateUserLogs } from "@/hooks/useCreateUserLogs"
import { useEffect, useState } from "react"
import { WorkoutItem } from "./types"

interface WorkoutLogSaveButtonProps {
  calIconType: string
  date: string
  totalDuration: number
  formData: WorkoutItem[]
}
const WorkoutLogSaveButton = ({
  calIconType,
  date,
  totalDuration,
  formData,
}: WorkoutLogSaveButtonProps) => {
  const [validation, setValidation] = useState({
    calIconType: false,
    date: false,
    totalDuration: false,
    workouts: false,
  })

  const { mutate: createLogs, isPending } = useCreateUserLogs()

  const validateForm = () => {
    const newValidation = {
      calIconType: validation.calIconType,
      date: validation.date,
      totalDuration: validation.totalDuration,
      workouts: validation.workouts,
    }
    setValidation(newValidation)
    return Object.values(newValidation).every(Boolean)
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const payload = {
      calIconType: calIconType,
      totalDuration: totalDuration,
      logDate: new Date(date.replace(/\./g, "-")),
      workouts: formData.map((item) => ({
        seq: item.id,
        exerciseName: item.title,
        setCount: item.data.length,
        exerciseInfo: item.data[0].exerciseInfo,
      })),
    }

    createLogs(payload)
  }

  useEffect(() => {
    validateForm()
  }, [calIconType, date, totalDuration, formData])

  return (
    <div className="sticky right-0 bottom-0 left-0">
      <Button
        isFullWidth
        onClick={handleSubmit}
        disabled={!Object.values(validation).every(Boolean) || isPending}
        variant={
          !Object.values(validation).every(Boolean) || isPending
            ? "disable"
            : "primary"
        }
      >
        <B1 fontWeight="bold" className="text-white-200 mr-3">
          {isPending ? "저장 중..." : "저장"}
        </B1>
        <Icon name="save" color="white-200" size={24} />
      </Button>
    </div>
  )
}

export default WorkoutLogSaveButton
