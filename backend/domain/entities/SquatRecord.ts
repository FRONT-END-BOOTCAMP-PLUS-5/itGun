export class SquatRecord {
  constructor(
    public readonly userId: string,
    public readonly weight: number,
    public readonly createdAt: Date = new Date(),
    public readonly id?: number
  ) {}
}
