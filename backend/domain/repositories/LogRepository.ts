import { Log } from "@/backend/domain/entities/Log"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface LogRepository {
  findAll(tx?: TransactionClient): Promise<Log[]>
  findAllByUserIdAndDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
    includeWorkouts?: boolean,
    tx?: TransactionClient
  ): Promise<Log[]>
  findFirstByUserId(userId: string, tx?: TransactionClient): Promise<Log | null>
  findById(id: number, tx?: TransactionClient): Promise<Log | null>
  save(log: Log, tx?: TransactionClient): Promise<Log>
  update(id: number, log: Partial<Log>, tx?: TransactionClient): Promise<Log | null>
  delete(id: number, tx?: TransactionClient): Promise<boolean>
}
