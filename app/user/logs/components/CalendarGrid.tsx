"use client"

import FullCalendar from "@fullcalendar/react"
import { EventContentArg } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import { forwardRef } from "react"
import { Button } from "@/ds/components/atoms/button/Button"
import CircularIcon from "@/ds/components/molecules/circularIcon/CircularIcon"
import { CalendarGridProps } from "@/app/user/logs/types"
import "@/app/user/logs/components/calendar.css"

export const CalendarGrid = forwardRef<FullCalendar, CalendarGridProps>(
  ({ events, onIconClick }, ref) => {
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
        ref={ref}
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
