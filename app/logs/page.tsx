"use client"

import { useLogsStore } from "@/hooks/useLogsStore"
import { useEffect, useState } from "react"
import AddWorkoutForm from "./components/AddWorkoutForm"
import DateTimeInput from "./components/DateTimeInput"
import ExerciseListModal from "./components/ExerciseListModal"
import { WorkoutData, FormData } from "./types"
import WorkoutLogSaveButton from "./components/WorkoutLogSaveButton"
import WorkoutTypeSelector from "./components/WorkoutTypeSelector"
import { CalIconType } from "@/services/user/logs/createUserLogs"
import dayjs from "dayjs"

const LogsPage = () => {
  const { open, setOpen, setInit } = useLogsStore()

  const [calIconType, setCalIconType] = useState<CalIconType | null>(null)
  const [date, setDate] = useState(dayjs().format("YYYY.MM.DD"))
  const [totalDuration, setTotalDuration] = useState<number>(0)
  const [formData, setFormData] = useState<FormData[]>([])
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>([])
  useEffect(() => {
    return () => {
      setInit()
    }
  }, [])

  return (
    <main className="flex h-full w-full flex-col gap-7 pb-[10px]">
      <DateTimeInput
        date={date}
        setDate={setDate}
        totalDuration={totalDuration}
        setTotalDuration={setTotalDuration}
      />

      <WorkoutTypeSelector
        calIconType={calIconType}
        setCalIconType={setCalIconType}
      />

      <AddWorkoutForm
        formData={formData}
        setFormData={setFormData}
        workoutData={workoutData}
        setWorkoutData={setWorkoutData}
      />

      <WorkoutLogSaveButton
        calIconType={calIconType}
        date={date}
        totalDuration={totalDuration}
        formData={formData}
        workoutData={workoutData}
      />

      {open && <ExerciseListModal setOpen={setOpen} />}
    </main>
  )
}

export default LogsPage
