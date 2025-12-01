"use client"

import FullCalendar from "@fullcalendar/react"
import { EventContentArg } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Button } from "@/ds/components/atoms/button/Button"
import CircularIcon from "@/ds/components/molecules/circularIcon/CircularIcon"
import { CalendarGridProps, Log } from "@/app/user/logs/types"
import "@/app/user/logs/components/calendar.css"
import { useEffect, useRef } from "react"
import { useUserLogsStore } from "@/hooks/useUserLogsStore"
import { CAL_TYPE_MAPPINGS } from "@/app/user/logs/constants"

const CalendarGrid = ({
  year,
  month
}: CalendarGridProps) => {
  const calendarRef = useRef<FullCalendar | null>(null)
  const logsOnMonth = useUserLogsStore((state) => state.logsOnMonth)
  const handleIconClick = useUserLogsStore((state) => state.handleIconClick)

  // year, month 변경 시 FullCalendar 동기화
  // - 상세 페이지에서 뒤로가기 통해 복귀한 경우!!
  // - URL 통해 직접 접근한 경우
  useEffect(() => {
    if (calendarRef.current && year && month) {
      const targetDate = new Date(parseInt(year), parseInt(month) - 1, 1)

      setTimeout(() => {
        calendarRef.current?.getApi().gotoDate(targetDate)
      }, 0)
    }
  }, [year, month])

  const groups: Record<string, Log[]> = {}
  logsOnMonth.forEach((log) => {
    const dateKey =
      log.logDate instanceof Date
        ? log.logDate.toLocaleDateString()
        : new Date(log.logDate).toLocaleDateString()

    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(log)
  })

  const events = (Object.entries(groups) as [string, Log[]][]).map(
    ([date, logsOnDate]) => ({
      title: date,
      start:
        logsOnDate[0].logDate instanceof Date
          ? logsOnDate[0].logDate
          : new Date(logsOnDate[0].logDate),
      iconName: CAL_TYPE_MAPPINGS(logsOnDate[0].calIconType).iconName,
      iconColor: CAL_TYPE_MAPPINGS(logsOnDate[0].calIconType).iconColor,
      logs: logsOnDate,
    })
  )

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <Button
        variant="ghost"
        size="xs"
        onClick={() => handleIconClick(eventInfo.event.extendedProps.logs)}
      >
        <CircularIcon
          iconName={eventInfo.event.extendedProps.iconName}
          iconFilledColor={eventInfo.event.extendedProps.iconColor}
          variant="ghost"
        />
      </Button>
    )
  }

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      height="auto"
      weekends={true}
      fixedWeekCount={false}
      headerToolbar={{ start: "", center: "", end: "" }}
      showNonCurrentDates={false}
      eventContent={renderEventContent}
      events={events}
      dayHeaderFormat={{ weekday: "narrow" }}
    />
  )
}

export default CalendarGrid
