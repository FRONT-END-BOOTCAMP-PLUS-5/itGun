import prisma from "../../../utils/prisma"
import { CharacterAsset } from "../../domain/entities/CharacterAsset"
import { CharacterAssetRepository } from "../../domain/repositories/CharacterAssetRepository"

export class PrCharacterAssetRepository implements CharacterAssetRepository {
  async findAll(): Promise<CharacterAsset[]> {
    const assets = await prisma.characterAsset.findMany()
    return assets.map(this.toDomain)
  }

  async findById(id: number): Promise<CharacterAsset | null> {
    const asset = await prisma.characterAsset.findUnique({
      where: { id },
    })
    return asset ? this.toDomain(asset) : null
  }

  async findAssets(
    characterId: number,
    conditions: { type: string; level: number }[]
  ): Promise<CharacterAsset[]> {
    const whereClauses = conditions.map((condition) => ({
      level: condition.level,
      type: condition.type,
    }))

    const assets = await prisma.characterAsset.findMany({
      where: {
        characterId: characterId,
        OR: whereClauses,
      },
    })

    return assets.map(this.toDomain)
  }

  async save(characterAsset: CharacterAsset): Promise<CharacterAsset> {
    const savedAsset = await prisma.characterAsset.create({
      data: {
        id: characterAsset.id,
        level: characterAsset.level,
        type: characterAsset.type,
        svg: characterAsset.svg,
        characterId: characterAsset.characterId,
      },
    })
    return this.toDomain(savedAsset)
  }

  async update(
    id: number,
    assetData: Partial<CharacterAsset>
  ): Promise<CharacterAsset | null> {
    try {
      const updatedAsset = await prisma.characterAsset.update({
        where: { id },
        data: {
          ...(assetData.level !== undefined && { level: assetData.level }),
          ...(assetData.type && { type: assetData.type }),
          ...(assetData.svg && { svg: assetData.svg }),
          ...(assetData.characterId !== undefined && {
            characterId: assetData.characterId,
          }),
        },
      })
      return this.toDomain(updatedAsset)
    } catch (error) {
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.characterAsset.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  private toDomain(asset: any): CharacterAsset {
    return new CharacterAsset(
      asset.id,
      asset.level,
      asset.type,
      asset.svg,
      asset.characterId
    )
  }
}
