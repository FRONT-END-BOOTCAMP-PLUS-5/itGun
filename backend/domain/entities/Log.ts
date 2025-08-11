import { LogWorkout } from "./LogWorkout"

export enum CalIconType {
  CARDIO = "cardio",
  UPPER = "upper",
  LOWER = "lower",
}

export class Log {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly calIconType: CalIconType,
    public readonly totalDuration: number,
    public readonly createdAt: Date = new Date(),

    // Relations
    public readonly logWorkouts?: LogWorkout[],
    public readonly gaugeChanges: Record<string, number> = {
      legs: 0,
      back: 0,
      chest: 0,
      shoulders: 0,
      arms: 0,
      core: 0,
    }
  ) {}
}
