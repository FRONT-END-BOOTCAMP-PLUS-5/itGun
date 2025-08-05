export enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower"
}

export class Log {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly calIconType: CalIconType,
    public readonly totalDuration: number,
    public readonly createdAt: Date = new Date()
  ) {}
}
