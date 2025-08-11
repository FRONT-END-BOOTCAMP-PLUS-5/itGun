import { UserRecord } from "@/backend/domain/entities/UserRecord"

export interface UserRecordRepository {
  findByUserId(userId: string): Promise<UserRecord | null>
  save(userRecord: UserRecord): Promise<UserRecord>
  update(id: number, userRecord: Partial<UserRecord>): Promise<UserRecord | null>
  delete(id: number): Promise<boolean>
}
