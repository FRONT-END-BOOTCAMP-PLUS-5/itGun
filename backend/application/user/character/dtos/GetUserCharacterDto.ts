export class CharacterAssetDto {
  constructor(
    public id: number,
    public level: number,
    public type: string,
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
