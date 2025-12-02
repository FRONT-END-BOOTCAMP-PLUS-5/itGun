export enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

export type BodyPartsGroup =
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

export interface CalendarGridProps {
  year: string
  month: string
}

export interface LogListProps {
  isFetching: boolean
}

export interface LogItemProps {
  log: Log
}
