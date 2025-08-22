import { EventInput } from "@fullcalendar/core"

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
}

export interface LogsListProps {
  logsToDisplay: Log[]
  selectedDate: string | null
  onLogClick: (logId: number) => void
  calTypeMaps: (calType: string) => {
    calTypeKo: string
    iconName: string
    iconColor: string
  }
}
