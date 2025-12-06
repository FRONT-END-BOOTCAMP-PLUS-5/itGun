"use client"

import { CalIconType } from "@/services/user/logs/createUserLogs"
import dayjs from "dayjs"
import { useState } from "react"
import AddWorkoutForm from "./components/AddWorkoutForm"
import DateTimeInput from "./components/DateTimeInput"
import WorkoutLogSaveButton from "./components/WorkoutLogSaveButton"
import WorkoutTypeSelector from "./components/WorkoutTypeSelector"

const LogsPage = () => {
  const [calIconType, setCalIconType] = useState<CalIconType | null>(null)
  const [date, setDate] = useState(dayjs().format("YYYY.MM.DD"))
  const [totalDuration, setTotalDuration] = useState<number>(0)

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

      <AddWorkoutForm />

      <WorkoutLogSaveButton
        calIconType={calIconType}
        date={date}
        totalDuration={totalDuration}
      />
    </main>
  )
}

export default LogsPage
