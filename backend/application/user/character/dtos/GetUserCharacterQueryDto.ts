export class GetUserCharacterQueryDto {
  constructor(
    public userId?: string,
    public earnedAt?: string | null,
    public createdAt?: string | null
  ) {}
}
