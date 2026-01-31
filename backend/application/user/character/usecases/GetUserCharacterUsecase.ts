import { GetUserCharacterQueryDto } from "../dtos/GetUserCharacterQueryDto"
import { GetUserCharacterDto } from "../dtos/GetUserCharacterDto"
import { CharacterAssetRepository } from "@/backend/domain/repositories/CharacterAssetRepository"
import { UserRepository } from "@/backend/domain/repositories/UserRepository"
import { BodyPartGaugeRepository } from "@/backend/domain/repositories/BodyPartGaugeRepository"
import { BodyPartGauge } from "@/backend/domain/entities/BodyPartGauge"

export class GetUserCharacterUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bodyPartGaugeRepository: BodyPartGaugeRepository,
    private readonly characterAssetRepository: CharacterAssetRepository
  ) {}

  async execute(query: GetUserCharacterQueryDto): Promise<GetUserCharacterDto> {
    const levels = {
      face: 0,
      torso: 0,
      arms: 0,
      legs: 0,
    }

    const characterInfo = {
      id: 1,
      color: "#cdc1ff",
    }

    if (query.userId) {
      const res = await this.userRepository.findCharacterInfoById(query.userId)
      if (res) {
        characterInfo.id = res.id
        characterInfo.color = res.color

        const earnedAtDate = query.earnedAt ? new Date(query.earnedAt) : undefined
        const createdAtDate = query.createdAt ? new Date(query.createdAt) : undefined

        const userGauges: BodyPartGauge | null = query.earnedAt || query.createdAt
          ? await this.bodyPartGaugeRepository.findByUserId(
              query.userId!!,
              earnedAtDate,
              createdAtDate
            )
          : await this.bodyPartGaugeRepository.findLatestOneByUserId(
              query.userId!!
            )

        if (userGauges) {
          levels.torso = Math.min(
            4,
            Math.floor(
              (userGauges.shoulders +
                userGauges.chest +
                userGauges.back +
                userGauges.core) /
                4
            ) + 1
          )
          levels.arms = Math.min(4, Math.floor(userGauges.arms) + 1)
          levels.legs = Math.min(4, Math.floor(userGauges.legs) + 1)
        }
      }
    }

    const requiredAssets = [
      { type: "FACE", level: levels.face },
      { type: "TORSO", level: levels.torso },
      { type: "ARMS", level: levels.arms },
      { type: "LEGS", level: levels.legs },
    ]

    if (!query.userId) {
      requiredAssets.push({
        type: "DUMBBELL_LEFT",
        level: 0,
      })
      requiredAssets.push({
        type: "DUMBBELL_RIGHT",
        level: 0,
      })
      requiredAssets.push({
        type: "SWEAT",
        level: 0,
      })
    }

    const characterAssets = await this.characterAssetRepository.findAssets(
      characterInfo.id,
      requiredAssets
    )

    return new GetUserCharacterDto(characterInfo.color, characterAssets)
  }
}
