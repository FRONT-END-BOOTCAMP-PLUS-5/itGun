"use client"

import FullCalendar from "@fullcalendar/react"
import { EventContentArg } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Button } from "@/ds/components/atoms/button/Button"
import CircularIcon from "@/ds/components/molecules/circularIcon/CircularIcon"
import { CalendarGridProps, Log } from "@/app/user/logs/types"
import "@/app/user/logs/components/calendar.css"

export const CalendarGrid = (
  ({ calendarRef, logsOnMonth, calTypeMaps, onIconClick }: CalendarGridProps) => {
    const groups: Record<string, Log[]> = {}
      logsOnMonth.forEach((log) => {
        const dateKey =
          log.logDate instanceof Date
            ? log.logDate.toDateString().split("T")[0]
            : new Date(log.logDate).toDateString().split("T")[0]

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
          iconName: calTypeMaps(logsOnDate[0].calIconType).iconName,
          iconColor: calTypeMaps(logsOnDate[0].calIconType).iconColor,
          logs: logsOnDate,
        })
      )

    function renderEventContent(eventInfo: EventContentArg) {
      return (
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onIconClick(eventInfo.event.extendedProps.logs)}
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
)
