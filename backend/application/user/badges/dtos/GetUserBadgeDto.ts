export class GetUserBadgeDto {
  constructor(
    public badgeId: number,
    public count: number,
    public latestEarnedAt: Date
  ) {}
}
