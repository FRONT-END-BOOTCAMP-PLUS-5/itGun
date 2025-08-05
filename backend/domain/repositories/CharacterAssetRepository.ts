import { CharacterAsset } from "../entities/CharacterAsset";

export interface CharacterAssetRepository {
  findAll(): Promise<CharacterAsset[]>;
  findById(id: number): Promise<CharacterAsset | null>;
  save(characterAsset: CharacterAsset): Promise<CharacterAsset>;
  update(id: number, characterAsset: Partial<CharacterAsset>): Promise<CharacterAsset | null>;
  delete(id: number): Promise<boolean>;
}
