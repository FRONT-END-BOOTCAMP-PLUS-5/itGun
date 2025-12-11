import LoadingCharacter from "@/app/components/loading/LoadingCharacter"
import LoadingText from "@/app/components/loading/LoadingText"
import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { B1 } from "@/ds/components/atoms/text/TextWrapper"
import { useCreateUserLogs } from "@/hooks/useCreateUserLogs"
import { useEffect, useState } from "react"
import { WorkoutData } from "@/app/logs/types"
import { useLogsStore } from "@/hooks/useLogsStore"

const WorkoutLogSaveButton = () => {
  const { formData, calIconType, date, totalDuration } = useLogsStore()
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
        Array.isArray(formData) &&
        formData.length > 0 &&
        formData.every((form) =>
          form.data.every(
            (data) =>
              data.durationSeconds ||
              data.weight ||
              data.repetitionCount ||
              data.distance
          )
        ),
    }
    setValidation(newValidation)
    return Object.values(newValidation).every(Boolean)
  }

  const handleSubmit = () => {
    if (!calIconType) return

    const workoutData = formData.flatMap((form, index: number) =>
      form.data.map((data, idx) => ({
        ...data,
        ...(data.weight && { weight: Number(data.weight) }),
        ...(data.repetitionCount && {
          repetitionCount: Number(data.repetitionCount),
        }),
        ...(data.distance && { distance: Number(data.distance) }),
        ...(data.durationSeconds && {
          durationSeconds: Number(data.durationSeconds),
        }),
        exerciseInfo: form.exerciseInfo,
        seq: index + 1,
        setCount: idx + 1,
        exerciseName: form.title,
      }))
    )

    const payload = {
      calIconType: calIconType,
      totalDuration: totalDuration,
      logDate: new Date(date.replace(/\./g, "-")),
      workouts: workoutData as unknown as WorkoutData[],
    }

    createLogs(payload)
  }

  useEffect(() => {
    validateForm()
  }, [calIconType, date, totalDuration, formData])

  if (isPending)
    return (
      <div className="fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center">
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
