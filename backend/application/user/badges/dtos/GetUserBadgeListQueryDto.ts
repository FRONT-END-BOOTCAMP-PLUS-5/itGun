export class GetUserBadgeListQueryDto {
  constructor(
    public userId: string,
    public limit?: number,
    public period?: number
  ) {}
}
