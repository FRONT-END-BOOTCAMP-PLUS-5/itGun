import { BodyPartGauge } from "@/backend/domain/entities/BodyPartGauge"
import { PostUserGaugeRequestDto } from "../dtos/PostUserGaugeRequestDto"
import { BodyPartGaugeRepository } from "@/backend/domain/repositories/BodyPartGaugeRepository"
import { PostUserGaugeDto } from "../dtos/PostUserGaugeDto"

export class PostUserGaugeUsecase {
  constructor(private bodyPartGaugeRepository: BodyPartGaugeRepository) {}

  private calculateDecreasedGauge(
    gauge: BodyPartGauge
  ): Omit<BodyPartGauge, "userId" | "createdAt"> {
    const getWeight = (value: number): number => {
      if (value < 1) return 0.6
      if (value < 2) return 0.85
      if (value < 3) return 1
      return 1.1
    }

    const decreasedValue = (value: number): number => {
      const weight = getWeight(value)
      const decreased = value - 0.1 * weight
      return Math.max(0, decreased)
    }

    return {
      arms: decreasedValue(gauge.arms),
      legs: decreasedValue(gauge.legs),
      shoulders: decreasedValue(gauge.shoulders),
      back: decreasedValue(gauge.back),
      chest: decreasedValue(gauge.chest),
      core: decreasedValue(gauge.core),
    }
  }

  async execute(request: PostUserGaugeRequestDto): Promise<PostUserGaugeDto> {
    const latest: BodyPartGauge | null =
      await this.bodyPartGaugeRepository.findLatestOneByUserId(request.userId)
    if (latest) {
      const now = new Date()
      const latestDate = latest.createdAt
      const diffInMs = now.getTime() - latestDate.getTime()
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

      if (diffInDays >= 14) {
        const decayedValues = this.calculateDecreasedGauge(latest)
        const updateGauge: BodyPartGauge = {
          userId: latest.userId,
          ...decayedValues,
          createdAt: now,
        }
        await this.bodyPartGaugeRepository.save(updateGauge)
        return { message: "게이지가 감소되었습니다." } as PostUserGaugeDto
      }
      return { message: "14일 이내 운동 기록 있음" } as PostUserGaugeDto
    }
    return { message: "운동기록이 없음" } as PostUserGaugeDto
  }
}
