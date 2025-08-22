import { LogDto } from "@/backend/application/user/logs/dtos/GetLogDto"

export interface GetUserLogsResponseDto {
  success: boolean
  message: string
  logs: LogDto[]
}
