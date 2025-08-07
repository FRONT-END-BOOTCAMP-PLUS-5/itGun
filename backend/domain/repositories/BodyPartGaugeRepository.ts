import { BodyPartGauge } from "../entities/BodyPartGauge"

export interface BodyPartGaugeRepository {
  findAll(): Promise<BodyPartGauge[]>
  findById(id: number): Promise<BodyPartGauge | null>
  findLatestOneByUserId(userId: string): Promise<BodyPartGauge | null>
  findByUserId(id: string, date?: Date): Promise<BodyPartGauge | null>
  findLatestOneByUserId(userId: string): Promise<BodyPartGauge | null>
  save(bodyPartGauge: BodyPartGauge): Promise<BodyPartGauge>
  update(
    id: number,
    bodyPartGauge: Partial<BodyPartGauge>
  ): Promise<BodyPartGauge | null>
  delete(id: number): Promise<boolean>
}
