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

export interface CalendarGridProps {
  year: string
  month: string
  calTypeMaps: CalTypeMaps
}

export interface LogListProps {
  isFetching: boolean
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
