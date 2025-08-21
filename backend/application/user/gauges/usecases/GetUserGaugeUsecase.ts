import { BodyPartGauge } from "@/backend/domain/entities/BodyPartGauge"
import { BodyPartGaugeRepository } from "@/backend/domain/repositories/BodyPartGaugeRepository"
import { GetUserGaugeRequestDto } from "../dtos/GetUserGaugeRequestDto"
import { GetUserGaugeResponseDto } from "../dtos/GetUserGuageResponseDto"

export class GetUserGaugeUsecase {
  constructor(private bodyPartGaugeRepository: BodyPartGaugeRepository) {}

  async execute(
    request: GetUserGaugeRequestDto
  ): Promise<GetUserGaugeResponseDto> {
    try {
      const latest: BodyPartGauge | null =
        await this.bodyPartGaugeRepository.findLatestOneByUserId(request.userId)

      if (!latest) {
        return new GetUserGaugeResponseDto(-1, 0, 0, 0, 0, 0, 0, 0)
      }

      if (!latest?.id) throw new Error("Body Part Gauge의 id가 존재하지 않음")

      return new GetUserGaugeResponseDto(
        latest?.id,
        latest?.arms,
        latest?.legs,
        latest?.shoulders,
        latest?.back,
        latest?.chest,
        latest?.core,
        latest?.stamina,
        latest?.earnedAt,
        latest?.createdAt
      )
    } catch {
      throw new Error("Body Parg Gauge Get Error")
    }
  }
}
