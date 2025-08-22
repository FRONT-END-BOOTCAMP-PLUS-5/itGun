import { BodyPartGauge } from "../entities/BodyPartGauge"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface BodyPartGaugeRepository {
  findAll(tx?: TransactionClient): Promise<BodyPartGauge[]>
  findById(id: number, tx?: TransactionClient): Promise<BodyPartGauge | null>
  findLatestOneByUserId(userId: string, tx?: TransactionClient): Promise<BodyPartGauge | null>
  findByUserId(id: string, date?: Date, tx?: TransactionClient): Promise<BodyPartGauge | null>
  save(bodyPartGauge: BodyPartGauge, tx?: TransactionClient): Promise<BodyPartGauge>
  update(
    id: number,
    bodyPartGauge: Partial<BodyPartGauge>,
    tx?: TransactionClient
  ): Promise<BodyPartGauge | null>
  delete(id: number, tx?: TransactionClient): Promise<boolean>
}
