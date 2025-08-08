import { LogDto } from "./GetLogDto"

export interface GetUserLogsResponseDto {
  success: boolean
  message: string
  logs: LogDto[]
}
