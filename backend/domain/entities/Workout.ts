export class Workout {
  constructor(
    public readonly id: number,
    public readonly seq: number,
    public readonly exerciseName: string,
    public readonly setCount: number,
    public readonly weight?: number,
    public readonly repetitionCount?: number,
    public readonly distance?: number,
    public readonly durationSeconds?: number
  ) {}
}
