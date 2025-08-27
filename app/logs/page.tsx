"use client"

import { useLogsStore } from "@/hooks/useLogsStore"
import { CalIconType } from "@/services/user/logs/createUserLogs"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import AddWorkoutForm from "./components/AddWorkoutForm"
import DateTimeInput from "./components/DateTimeInput"
import ExerciseListModal from "./components/ExerciseListModal"
import WorkoutLogSaveButton from "./components/WorkoutLogSaveButton"
import WorkoutTypeSelector from "./components/WorkoutTypeSelector"
import { FormData } from "./types"

const LogsPage = () => {
  const { open, setOpen, setInit } = useLogsStore()

  const [calIconType, setCalIconType] = useState<CalIconType | null>(null)
  const [date, setDate] = useState(dayjs().format("YYYY.MM.DD"))
  const [totalDuration, setTotalDuration] = useState<number>(0)
  const [formData, setFormData] = useState<FormData[]>([])

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

      <AddWorkoutForm formData={formData} setFormData={setFormData} />

      <WorkoutLogSaveButton
        calIconType={calIconType}
        date={date}
        totalDuration={totalDuration}
        formData={formData}
      />

      {open && <ExerciseListModal setOpen={setOpen} />}
    </main>
  )
}

export default LogsPage
