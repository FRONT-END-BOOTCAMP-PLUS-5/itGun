export class UserBadge {
  constructor(
    public readonly id: number,
    public readonly badgeId: number,
    public readonly userId: string,
    public readonly createdAt: Date = new Date()
  ) {}
}
