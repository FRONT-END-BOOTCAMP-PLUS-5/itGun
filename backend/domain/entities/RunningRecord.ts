export class RunningRecord {
  constructor(
    public readonly userId: string,
    public readonly distance: number,
    public readonly createdAt: Date = new Date(),
    public readonly id?: number
  ) {}
}
