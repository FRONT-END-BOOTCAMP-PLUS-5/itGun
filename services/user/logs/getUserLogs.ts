import { api } from "@/utils/api/apiClient"

enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

export interface Log {
    id: number
    userId: string
    calIconType: CalIconType
    logDate: Date
    totalDuration: number
    gaugeChanges: Record<string, number>
}

export interface GetLogsResponse {
    message: "success" | "error"
    logs?: Log[]
}

export const getUserLogs = (year: number, month: number) => {
    const params = new URLSearchParams()
    if (year) {
        params.append("year", String(year))
    }
    if (month) {
        params.append("month", String(month))
    }

    const queryString = params.toString()
    const endpoint = `/user/logs?${queryString}`

    return api.get<GetLogsResponse>(endpoint)
}
