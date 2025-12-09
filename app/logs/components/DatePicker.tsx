"use client"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import dayjs from "dayjs"
import Icon from "@/ds/components/atoms/icon/Icon"
import { DatePickerProps } from "@/app/logs/types"

const CustomDatePicker = ({ date, setDate }: DatePickerProps) => {
  const selectedDate = date ? dayjs(date, "YYYY.MM.DD").toDate() : new Date()

  const handleDateChange = (date: Date | null) => {
    if (!date) return
    setDate(dayjs(date).format("YYYY.MM.DD"))
  }

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    nextMonthButtonDisabled,
  }: {
    date: Date
    decreaseMonth: () => void
    increaseMonth: () => void
    nextMonthButtonDisabled: boolean
  }) => {
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()

    return (
      <div className="flex items-center justify-around gap-2">
        <button
          type="button"
          onClick={decreaseMonth}
          className="cursor-pointer"
        >
          <Icon name="leftArrow" />
        </button>
        <div className="flex gap-1">
          <span>{currentYear}년</span>
          <span>{currentMonth + 1}월</span>
        </div>
        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="disabled:opacity-50"
        >
          <Icon name="rightArrow" />
        </button>
      </div>
    )
  }

  const maxDate = new Date()

  return (
    <DatePicker
      selected={selectedDate}
      openToDate={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy.MM.dd"
      className="ml-[-10px] !w-30 scale-75 cursor-pointer border-b-1 border-[var(--color-secondary)] bg-transparent text-center text-[16px] font-[var(--color-secondary)] outline-none"
      showPopperArrow={false}
      renderCustomHeader={renderCustomHeader}
      formatWeekDay={(name) => name.charAt(0).toUpperCase()}
      maxDate={maxDate}
      shouldCloseOnSelect={true}
    />
  )
}

export default CustomDatePicker
