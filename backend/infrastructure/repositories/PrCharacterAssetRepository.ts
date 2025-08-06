import prisma from "../../../utils/prisma";
import { CharacterAsset, BodyPart } from "../../domain/entities/CharacterAsset";
import { CharacterAssetRepository } from "../../domain/repositories/CharacterAssetRepository";

export class PrCharacterAssetRepository implements CharacterAssetRepository {

  async findAll(): Promise<CharacterAsset[]> {
    const assets = await prisma.characterAsset.findMany();
    return assets.map(this.toDomain);
  }

  async findById(id: number): Promise<CharacterAsset | null> {
    const asset = await prisma.characterAsset.findUnique({
      where: { id }
    });
    return asset ? this.toDomain(asset) : null;
  }

  async save(characterAsset: CharacterAsset): Promise<CharacterAsset> {
    const savedAsset = await prisma.characterAsset.create({
      data: {
        id: characterAsset.id,
        level: characterAsset.level,
        bodyPart: characterAsset.bodyPart,
        svg: characterAsset.svg,
        characterId: characterAsset.characterId
      }
    });
    return this.toDomain(savedAsset);
  }

  async update(id: number, assetData: Partial<CharacterAsset>): Promise<CharacterAsset | null> {
    try {
      const updatedAsset = await prisma.characterAsset.update({
        where: { id },
        data: {
          ...(assetData.level !== undefined && { level: assetData.level }),
          ...(assetData.bodyPart && { bodyPart: assetData.bodyPart }),
          ...(assetData.svg && { svg: assetData.svg }),
          ...(assetData.characterId !== undefined && { characterId: assetData.characterId })
        }
      });
      return this.toDomain(updatedAsset);
    } catch (error) {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.characterAsset.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  private toDomain(asset: any): CharacterAsset {
    return new CharacterAsset(
      asset.id,
      asset.level,
      asset.bodyPart as BodyPart,
      asset.svg,
      asset.characterId
    );
  }
}