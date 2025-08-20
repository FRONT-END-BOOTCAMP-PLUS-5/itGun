import { CharacterAsset } from "../entities/CharacterAsset"

export interface CharacterAssetRepository {
  findAll(): Promise<CharacterAsset[]>
  findById(id: number): Promise<CharacterAsset | null>
  findAssets(
    characterId: number,
    conditions: { type: string; level: number }[]
  ): Promise<CharacterAsset[]>
  save(characterAsset: CharacterAsset): Promise<CharacterAsset>
  update(
    id: number,
    characterAsset: Partial<CharacterAsset>
  ): Promise<CharacterAsset | null>
  delete(id: number): Promise<boolean>
}
