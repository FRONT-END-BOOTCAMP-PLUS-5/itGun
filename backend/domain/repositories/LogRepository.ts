import { Log } from "../entities/Log"

export interface LogRepository {
  findAll(): Promise<Log[]>
  findAllByUserIdAndMonth(
    userId: string,
    year: number,
    month: number
  ): Promise<Log[]>
  findById(id: number): Promise<Log | null>
  save(log: Log): Promise<Log>
  update(id: number, log: Partial<Log>): Promise<Log | null>
  delete(id: number): Promise<boolean>
}
