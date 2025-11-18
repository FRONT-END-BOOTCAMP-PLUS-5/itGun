"use client"

import Icon from "@/ds/components/atoms/icon/Icon"
import { Input } from "@/ds/components/atoms/input/Input"
import { C1 } from "@/ds/components/atoms/text/TextWrapper"
import dayjs from "dayjs"
import { DateTypeProps } from "./type"

const DateTimeInput = ({
  date,
  setDate,
  totalDuration,
  setTotalDuration,
}: DateTypeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberRegex = /^[0-9]{0,3}$/

    if (numberRegex.test(value)) {
      setTotalDuration(value === "" ? 0 : parseInt(value, 10))
    }
  }

  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon name="calendar" size={24} />
        <Input
          size="sm"
          inputMode="numeric"
          className="ml-[-10px] !w-30 scale-75 text-center text-[16px]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => setDate((prev) => dayjs(prev).format("YYYY.MM.DD"))}
          onFocus={() => setDate((prev) => prev.split(".").join(""))}
        />
      </div>

      <div className="flex items-center gap-2">
        <Icon name="clock" size={24} />
        <Input
          value={totalDuration === 0 ? "" : totalDuration}
          onChange={handleChange}
          size="sm"
          inputMode="numeric"
          className="!w-10 scale-75 text-center text-[16px]"
          placeholder="0"
        />
        <C1>분</C1>
      </div>
    </section>
  )
}

export default DateTimeInput
