import { Badge } from "../entities/Badge"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export interface BadgeRepository {
  findAll(tx?: TransactionClient): Promise<Badge[]>
  findById(id: number, tx?: TransactionClient): Promise<Badge | null>
  save(badge: Badge, tx?: TransactionClient): Promise<Badge>
  update(id: number, badge: Partial<Badge>, tx?: TransactionClient): Promise<Badge | null>
  delete(id: number, tx?: TransactionClient): Promise<boolean>
}
