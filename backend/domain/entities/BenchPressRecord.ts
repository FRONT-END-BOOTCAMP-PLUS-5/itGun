export class BenchPressRecord {
  constructor(
    public readonly userId: string,
    public readonly weight: number,
    public readonly earnedAt: Date = new Date(),
    public readonly createdAt: Date = new Date(),
    public readonly id?: number
  ) {}
}
