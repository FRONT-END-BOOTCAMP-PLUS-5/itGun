import { GetUserCharacterQueryDto } from "../dtos/GetUserCharacterQueryDto"
import {
  CharacterAssetDto,
  GetUserCharacterDto,
} from "../dtos/GetUserCharacterDto"
import { CharacterAssetRepository } from "@/backend/domain/repositories/CharacterAssetRepository"
import { UserRepository } from "@/backend/domain/repositories/UserRepository"
import { BodyPartGaugeRepository } from "@/backend/domain/repositories/BodyPartGaugeRepository"
import { yymmddToDate } from "@/utils/yymmddToDate"
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

        const userGauges: BodyPartGauge | null = query.date
          ? await this.bodyPartGaugeRepository.findByUserId(
              query.userId!!,
              yymmddToDate(query.date)
            )
          : await this.bodyPartGaugeRepository.findLatestOneByUserId(
              query.userId!!
            )

        if (userGauges) {
          levels.torso =
            Math.floor(
              (userGauges.shoulders +
                userGauges.chest +
                userGauges.back +
                userGauges.core) /
                4
            ) + 1
          levels.arms = Math.floor(userGauges.arms) + 1
          levels.legs = Math.floor(userGauges.legs) + 1
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

    const assetsByPart = characterAssets.reduce(
      (accumulator, asset) => {
        accumulator[asset.type] = new CharacterAssetDto(
          asset.id,
          asset.level,
          asset.type,
          asset.svg
        )
        return accumulator
      },
      {} as { [key: string]: CharacterAssetDto }
    )

    return new GetUserCharacterDto(
      characterInfo.color,
      assetsByPart.face,
      assetsByPart.torso,
      assetsByPart.arms,
      assetsByPart.legs
    )
  }
}
