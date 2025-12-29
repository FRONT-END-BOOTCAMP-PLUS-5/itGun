"use client"

import { Button } from "@/ds/components/atoms/button/Button"
import { C1, H1 } from "@/ds/components/atoms/text/TextWrapper"
import Icon from "@/ds/components/atoms/icon/Icon"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation";

export const CalendarHeader = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const now = new Date()
  const year = searchParams.get("year") || now.getFullYear().toString()
  const month = searchParams.get("month") || (now.getMonth() + 1).toString()

  const isCurrentMonth = () => {
    return year === now.getFullYear().toString() && month === (now.getMonth() + 1).toString()
  }

  const handleNext = () => {
    const date = new Date(parseInt(year), parseInt(month) - 1, 1)
    date.setMonth(date.getMonth() + 1)

    const newYear = date.getFullYear()
    const newMonth = date.getMonth() + 1

    router.replace(`/user/logs?year=${newYear}&month=${newMonth}`)
  }

  const handlePrev = () => {
    const date = new Date(parseInt(year), parseInt(month) - 1, 1)
    date.setMonth(date.getMonth() - 1)

    const newYear = date.getFullYear()
    const newMonth = date.getMonth() + 1

    router.replace(`/user/logs?year=${newYear}&month=${newMonth}`)
  }

  const handleToday = () => {
    const now = new Date()
    router.replace(`/user/logs?year=${now.getFullYear()}&month=${now.getMonth() + 1}`)
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
          <H1>{`${year}.${month.padStart(2, "0")}`}</H1>
        </div>
        <div className={`next-button ${isCurrentMonth() ? "invisible" : "visible"}`}>
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
