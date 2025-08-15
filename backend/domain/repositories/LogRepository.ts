import { Log } from "@/backend/domain/entities/Log"

export interface LogRepository {
  findAll(): Promise<Log[]>
  findAllByUserIdAndDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
    includeWorkouts?: boolean
  ): Promise<Log[]>
  findFirstByUserId(userId: string): Promise<Log | null>
  findById(id: number): Promise<Log | null>
  save(log: Log): Promise<Log>
  update(id: number, log: Partial<Log>): Promise<Log | null>
  delete(id: number): Promise<boolean>
}
