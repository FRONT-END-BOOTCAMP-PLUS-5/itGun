export class BodyPartGauge {
  constructor(
    public readonly userId: string,
    public readonly arms: number = 0,
    public readonly legs: number = 0,
    public readonly shoulders: number = 0,
    public readonly back: number = 0,
    public readonly chest: number = 0,
    public readonly core: number = 0,
    public readonly createdAt: Date = new Date(),
    public readonly id?: number
  ) {}
}
