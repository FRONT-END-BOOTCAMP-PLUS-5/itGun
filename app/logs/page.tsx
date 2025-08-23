"use client"

import { useLogsStore } from "@/hooks/useLogsStore"
import { useState } from "react"
import AddWorkoutForm from "./components/AddWorkoutForm"
import DateTimeInput from "./components/DateTimeInput"
import ExerciseListModal from "./components/ExerciseListModal"
import { WorkoutItem } from "./components/types"
import WorkoutLogSaveButton from "./components/WorkoutLogSaveButton"
import WorkoutTypeSelector from "./components/WorkoutTypeSelector"

const LogsPage = () => {
  const { open, setOpen } = useLogsStore()

  const [calIconType, setCalIconType] = useState("")
  const [date, setDate] = useState("")
  const [totalDuration, setTotalDuration] = useState(0)
  const [formData, setFormData] = useState<WorkoutItem[]>([])

  return (
    <main className="flex w-full flex-col gap-7">
      <DateTimeInput
        date={date}
        setDate={setDate}
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
