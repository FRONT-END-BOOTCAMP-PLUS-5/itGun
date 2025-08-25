"use client"

import Icon from "@/ds/components/atoms/icon/Icon"
import { Input } from "@/ds/components/atoms/input/Input"
import { C1 } from "@/ds/components/atoms/text/TextWrapper"
import dayjs from "dayjs"
import { DateTypeProps } from "./type"

const DateTimeInput = ({ date, setDate, setTotalDuration }: DateTypeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberRegex = /^[0-9]{1,3}$/

    if (numberRegex.test(value) || value === "") {
      const numValue = parseInt(value) || 0
      if (numValue >= 0 && numValue <= 999) {
        setTotalDuration(numValue)
      }
    }
  }

  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon name="calendar" size={24} />
        <Input
          size="sm"
          inputMode="numeric"
          className="!w-24 text-center [&_input]:!scale-75 [&_input]:!text-base"
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
          inputMode="numeric"
          className="!w-6 text-center [&_input]:!scale-75 [&_input]:!text-base"
          onChange={handleChange}
          placeholder="0"
        />
        <C1>분</C1>
      </div>
    </section>
  )
}

export default DateTimeInput
