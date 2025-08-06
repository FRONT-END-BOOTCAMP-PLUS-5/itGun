export enum BodyPart {
  ARMS = "arms",
  LEGS = "legs",
  TORSO = "torso"
}

export class CharacterAsset {
  constructor(
    public readonly id: number,
    public readonly level: number = 1,
    public readonly bodyPart: BodyPart,
    public readonly svg: string,
    public readonly characterId: number
  ) {}
}
