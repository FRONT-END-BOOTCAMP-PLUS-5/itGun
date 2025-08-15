export class RunningRecord {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly distance: number,
    public readonly createdAt: Date = new Date()
  ) {}
}
