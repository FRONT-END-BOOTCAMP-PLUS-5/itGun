export class CharacterAsset {
  constructor(
    public readonly id: number,
    public readonly level: number = 1,
    public readonly type: string,
    public readonly svg: string,
    public readonly characterId: number
  ) {}
}
