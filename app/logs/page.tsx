"use client"

import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { IconProps } from "@/ds/components/atoms/icon/Icon.types"
import { Input } from "@/ds/components/atoms/input/Input"
import { B1, C1, H1 } from "@/ds/components/atoms/text/TextWrapper"
import { Header } from "@/ds/components/molecules/header/Header"
import Workout from "@/ds/components/molecules/workout/Workout"
import { useLogsStore } from "@/hooks/useLogsStore"
import { useState } from "react"
import ExercisesPage from "../exercises/page"
import dayjs from "dayjs"

const calIconTypes = [
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
const LogsPage = () => {
  const { open, exerciseData, setMode, setOpen } = useLogsStore()

  console.log(exerciseData)
  const [calIconType, setCalIconType] = useState("")
  const [date, setDate] = useState("")

  const handleAddLog = () => {
    setMode("logs")
    setOpen(true)
  }

  return (
    <main className="flex w-full flex-col gap-7">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="calendar" size={24} />
          <Input
            size="sm"
            className="!w-24"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onBlur={() => setDate((prev) => dayjs(prev).format("YYYY.MM.DD"))}
            onFocus={() => setDate((prev) => prev.split(".").join(""))}
          />
        </div>

        <div className="flex items-center gap-2">
          <Icon name="clock" size={24} />
          <Input size="sm" className="!w-6" />
          <C1>분</C1>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-7">
        <H1>오늘은 무슨 데이?</H1>
        <ul className="flex items-center gap-6">
          {calIconTypes.map(({ type, icon, label, color }) => (
            <li
              key={type}
              className="flex flex-col items-center gap-4"
              onClick={() => setCalIconType(type)}
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

      <section className="flex flex-col items-center justify-center gap-7">
        <Workout
          title="운동"
          type={"weight-reps"}
          data={[]}
          isEditable={true}
          onAddSet={() => {}}
          isFullWidth={true}
        />
        <button onClick={handleAddLog}>
          <Icon name="plus" size={40} />
        </button>
      </section>

      <div className="sticky right-0 bottom-0 left-0">
        <Button isFullWidth>
          <B1 fontWeight="bold" className="text-white-200 mr-3">
            저장
          </B1>
          <Icon name="save" color="white-200" size={24} />
        </Button>
      </div>

      {open && (
        <div className="bg-white-200 fixed inset-0 z-[100] mx-auto min-h-screen max-w-[430px] overflow-y-auto [&>main]:mt-[70px] [&>main]:px-[30px]">
          <Header className="sticky top-0" onBack={() => setOpen(false)} />
          <ExercisesPage />
        </div>
      )}
    </main>
  )
}

export default LogsPage
