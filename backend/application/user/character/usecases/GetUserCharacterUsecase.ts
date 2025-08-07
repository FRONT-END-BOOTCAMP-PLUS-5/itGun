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
import { BodyPart } from "@/backend/domain/entities/CharacterAsset"

export class GetUserCharacterUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bodyPartGaugeRepository: BodyPartGaugeRepository,
    private readonly characterAssetRepository: CharacterAssetRepository
  ) {}

  async execute(query: GetUserCharacterQueryDto): Promise<GetUserCharacterDto> {
    const characterInfo = await this.userRepository.findCharacterInfoById(
      query.userId
    )
    if (!characterInfo) {
      throw new Error("User not found")
    }

    const userGauges: BodyPartGauge | null =
      await this.bodyPartGaugeRepository.findByUserId(
        query.userId,
        query.date ? yymmddToDate(query.date) : undefined
      )

    const levels = {
      face: 1, // 얼굴은 항상 1레벨
      torso: 1,
      arms: 1,
      legs: 1,
    }

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

    const requiredAssets = [
      { bodyPart: BodyPart.FACE, level: levels.face },
      { bodyPart: BodyPart.TORSO, level: levels.torso },
      { bodyPart: BodyPart.ARMS, level: levels.arms },
      { bodyPart: BodyPart.LEGS, level: levels.legs },
    ]

    const characterAssets = await this.characterAssetRepository.findAssets(
      characterInfo.id,
      requiredAssets
    )

    const assetsByPart = characterAssets.reduce(
      (accumulator, asset) => {
        accumulator[asset.bodyPart] = new CharacterAssetDto(
          asset.id,
          asset.level,
          asset.bodyPart,
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
