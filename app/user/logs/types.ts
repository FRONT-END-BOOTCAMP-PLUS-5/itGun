import { EventInput } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import React from "react"

enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

type BodyPartsGroup =
  | "legs"
  | "back"
  | "chest"
  | "shoulders"
  | "arms"
  | "core"
  | "stamina"

export interface Log {
  id: number
  userId: string
  calIconType: CalIconType
  logDate: Date
  totalDuration: number
  gaugeChanges: Record<BodyPartsGroup, number>
}

export interface CalendarHeaderProps {
  calMonth: string
  onNext: () => void
  onPrev: () => void
  onToday: () => void
}

export interface CalendarGridProps {
  events: EventInput[]
  onIconClick: (logs: Log[]) => void
  calendarRef: React.RefObject<FullCalendar |null>
}

export interface LogListProps {
  logsToDisplay: Log[]
  selectedDate: string | null
  calTypeMaps: (calType: string) => {
    calTypeKo: string
    iconName: string
    iconColor: string
  }
}

export interface LogItemProps {
  log: Log
  calTypeMaps: (calType: string) => {
    calTypeKo: string
    iconName: string
    iconColor: string
  }
}
