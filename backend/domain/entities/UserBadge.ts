export class UserBadge {
  constructor(
    public readonly id: number,
    public readonly badgeId: number,
    public readonly userId: string,
    public readonly earnedAt: Date = new Date(),
    public readonly createdAt: Date = new Date()
  ) {}
}
