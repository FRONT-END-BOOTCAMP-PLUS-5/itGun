"use client"

import Icon from "@/ds/components/atoms/icon/Icon"
import { Input } from "@/ds/components/atoms/input/Input"
import { C1 } from "@/ds/components/atoms/text/TextWrapper"
import { DateTypeProps } from "./type"
import CustomDatePicker from "./DatePicker"

const DateTimeInput = ({
  date,
  setDate,
  totalDuration,
  setTotalDuration,
}: DateTypeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberRegex = /^[0-9]{1,3}$/

    if (value === "") {
      setTotalDuration(0)
    } else {
      if (numberRegex.test(value)) {
        const numValue = parseInt(value)
        if (numValue >= 0 && numValue <= 999) {
          setTotalDuration(numValue)
        }
      }
    }
  }

  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon name="calendar" size={24} />
        <CustomDatePicker date={date} setDate={setDate} />
      </div>

      <div className="flex items-center gap-2">
        <Icon name="clock" size={24} />
        <Input
          value={totalDuration === 0 ? "" : totalDuration}
          onChange={handleChange}
          size="sm"
          type="number"
          min={0}
          max={999}
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
