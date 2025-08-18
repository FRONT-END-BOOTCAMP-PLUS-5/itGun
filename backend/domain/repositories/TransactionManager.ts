import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface TransactionManager {
  executeInTransaction<T>(
    callback: (tx: TransactionClient) => Promise<T>
  ): Promise<T>
}
