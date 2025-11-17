"use client"

import { Button } from "@/ds/components/atoms/button/Button"
import { C1, H1 } from "@/ds/components/atoms/text/TextWrapper"
import Icon from "@/ds/components/atoms/icon/Icon"
import { CalendarHeaderProps } from "@/app/user/logs/types"
import { useRouter } from "next/navigation"

export const CalendarHeader = ({
  calendarRef,
  calMonth,
  setCalMonth,
  setSelectedDate,
}: CalendarHeaderProps) => {
  const router = useRouter()

  const setNewMonthTitle = () => {
    if (calendarRef.current) {
      const date = calendarRef.current.getApi().getDate()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const newMonth = `${year}.${month.toString().padStart(2, "0")}`
      
      setCalMonth(newMonth)
      setSelectedDate(null)

      router.replace(`/user/logs?year=${year}&month=${month}`)    
    }
  }

  const handleNext = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next()
      setNewMonthTitle()
    }
  }

  const handlePrev = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev()
      setNewMonthTitle()
    }
  }

  const handleToday = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today()
      setNewMonthTitle()
    }
  }
  return (
    <div className="calendar-title-box grid w-full grid-cols-5 gap-2">
      <div></div>
      <div className="col-span-3 flex items-center justify-center gap-2">
        <div className="prev-button">
          <Button variant="ghost" size="xs" onClick={handlePrev}>
            <Icon name="leftArrow" size={24} />
          </Button>
        </div>
        <div className="title">
          <H1>{calMonth}</H1>
        </div>
        <div className="next-button">
          <Button variant="ghost" size="xs" onClick={handleNext}>
            <Icon name="rightArrow" size={24} />
          </Button>
        </div>
      </div>
      <div className="today-button flex items-center justify-center">
        <Button variant="ghost" size="xs" onClick={handleToday}>
          <C1 variant="secondary">today</C1>
        </Button>
      </div>
    </div>
  )
}
