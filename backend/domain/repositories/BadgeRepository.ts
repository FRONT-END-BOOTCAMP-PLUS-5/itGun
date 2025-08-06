import { Badge } from "../entities/Badge"

export interface BadgeRepository {
  findAll(): Promise<Badge[]>
  findById(id: number): Promise<Badge | null>
  save(badge: Badge): Promise<Badge>
  update(id: number, badge: Partial<Badge>): Promise<Badge | null>
  delete(id: number): Promise<boolean>
}
