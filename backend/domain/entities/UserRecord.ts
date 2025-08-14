export class UserRecord {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly benchPressMax?: number,
    public readonly squatMax?: number,
    public readonly deadliftMax?: number,
    public readonly runningMax?: number,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
