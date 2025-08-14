export class BigThreeRecord {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly weight: number,
    public readonly createdAt: Date = new Date()
  ) {}
}
