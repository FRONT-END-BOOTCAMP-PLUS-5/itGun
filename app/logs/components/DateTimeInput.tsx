"use client"

import Icon from "@/ds/components/atoms/icon/Icon"
import { Input } from "@/ds/components/atoms/input/Input"
import { C1 } from "@/ds/components/atoms/text/TextWrapper"
import dayjs from "dayjs"
import { Dispatch, SetStateAction } from "react"

interface DateTypeProps {
  date: string
  setDate: Dispatch<SetStateAction<string>>
  setTotalDuration: Dispatch<SetStateAction<number>>
}
const DateTimeInput = ({ date, setDate, setTotalDuration }: DateTypeProps) => {
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon name="calendar" size={24} />
        <Input
          size="sm"
          className="!w-24 text-center"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => setDate((prev) => dayjs(prev).format("YYYY.MM.DD"))}
          onFocus={() => setDate((prev) => prev.split(".").join(""))}
        />
      </div>

      <div className="flex items-center gap-2">
        <Icon name="clock" size={24} />
        <Input
          size="sm"
          type="number"
          className="!w-6 text-center"
          onChange={(e) => setTotalDuration(Number(e.target.value))}
        />
        <C1>분</C1>
      </div>
    </section>
  )
}

export default DateTimeInput
