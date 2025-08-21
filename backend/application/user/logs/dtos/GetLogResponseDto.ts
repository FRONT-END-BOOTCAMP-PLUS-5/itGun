import { LogDto } from "@/backend/application/user/logs/dtos/GetLogDto"

export interface GetLogResponseDto {
  success: boolean
  message: string
  log?: LogDto
}
