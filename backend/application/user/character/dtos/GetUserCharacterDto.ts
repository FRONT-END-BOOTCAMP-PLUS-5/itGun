export enum BodyPart {
  FACE = "face",
  ARMS = "arms",
  LEGS = "legs",
  TORSO = "torso",
}

export class CharacterAssetDto {
  constructor(
    public id: number,
    public level: number,
    public bodyPart: BodyPart,
    public svg: string
  ) {}
}

export class GetUserCharacterDto {
  constructor(
    public characterColor: string,
    public face: CharacterAssetDto,
    public torso: CharacterAssetDto,
    public arms: CharacterAssetDto,
    public legs: CharacterAssetDto
  ) {}
}
