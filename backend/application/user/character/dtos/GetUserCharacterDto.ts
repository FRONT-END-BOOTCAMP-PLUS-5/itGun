export class CharacterAssetDto {
  constructor(
    public id: number,
    public level: number,
    public bodyPart: string, //enum으로 해야하나
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
