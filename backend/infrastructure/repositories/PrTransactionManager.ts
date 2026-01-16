import prisma from "@/utils/prisma"
import { TransactionManager } from "@/backend/domain/repositories/TransactionManager"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrTransactionManager implements TransactionManager {
  async executeInTransaction<T>(callback: (tx: TransactionClient) => Promise<T>): Promise<T> {
    return await prisma.$transaction(async (tx) => {
      return await callback(tx)
    }, {
      maxWait: 10000, // 10초
      timeout: 30000, // 30초
    })
  }
}
