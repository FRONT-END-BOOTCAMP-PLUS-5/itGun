import LoadingCharacter from "@/app/components/loading/LoadingCharacter"
import LoadingText from "@/app/components/loading/LoadingText"
import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { B1 } from "@/ds/components/atoms/text/TextWrapper"
import { useCreateUserLogs } from "@/hooks/useCreateUserLogs"
import { useEffect, useState } from "react"
import { WorkoutLogSaveButtonProps } from "./type"

const WorkoutLogSaveButton = ({
  calIconType,
  date,
  totalDuration,
  formData,
  workoutData,
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
      calIconType: !!calIconType,
      date: !!date,
      totalDuration: totalDuration > 0,
      workouts:
        Array.isArray(workoutData) &&
        workoutData.length > 0 &&
        workoutData.every(
          (workout) =>
            workout.durationSeconds ||
            workout.distance ||
            workout.weight ||
            workout.repetitionCount
        ),
    }
    setValidation(newValidation)
    return Object.values(newValidation).every(Boolean)
  }

  const handleSubmit = () => {
    if (!calIconType) return
    const payload = {
      calIconType: calIconType,
      totalDuration: totalDuration,
      logDate: new Date(date.replace(/\./g, "-")),
      workouts: workoutData,
    }

    createLogs(payload)
  }

  useEffect(() => {
    validateForm()
  }, [calIconType, date, totalDuration, formData])

  if (isPending)
    return (
      <div className="bg-white-200 fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center">
        <LoadingCharacter />
        <LoadingText text="저장 중..." />
      </div>
    )
  return (
    <div className="-mx-3 mt-auto">
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
        <B1 fontWeight="bold" className="!text-white-200 mr-3">
          {isPending ? "저장 중..." : "저장"}
        </B1>
        <Icon name="save" color="white-200" size={24} />
      </Button>
    </div>
  )
}

export default WorkoutLogSaveButton
