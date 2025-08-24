import FullCalendar from "@fullcalendar/react"
import React, { Dispatch, SetStateAction } from "react"

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

export type CalTypeMaps = (calType: string) => {
  calTypeKo: string
  iconName: string
  iconColor: string
}
export interface Log {
  id: number
  userId: string
  calIconType: CalIconType
  logDate: Date
  totalDuration: number
  gaugeChanges: Record<BodyPartsGroup, number>
}

export interface CalendarHeaderProps {
  calendarRef: React.RefObject<FullCalendar | null>
  calMonth: string
  setCalMonth: Dispatch<SetStateAction<string>>
  setSelectedDate: Dispatch<SetStateAction<string | null>>
}

export interface CalendarGridProps {
  calendarRef: React.RefObject<FullCalendar | null>
  logsOnMonth: Log[]
  calTypeMaps: CalTypeMaps
  onIconClick: (logs: Log[]) => void
}

export interface LogListProps {
  isFetching: boolean
  logsToDisplay: Log[]
  selectedDate: string | null
  calTypeMaps: CalTypeMaps
}

export interface LogItemProps {
  log: Log
  calTypeMaps: (calType: string) => {
    calTypeKo: string
    iconName: string
    iconColor: string
  }
}
