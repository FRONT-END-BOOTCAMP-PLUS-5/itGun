import { Log } from "./Log"
import { Workout } from "./Workout"

export class LogWorkout {
  constructor(
    public readonly id: number,
    public readonly logId: number,
    public readonly workoutId: number,
    public readonly createdAt: Date = new Date(),
    public readonly log?: Log,
    public readonly workout?: Workout
  ) {}
}
