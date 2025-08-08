export class GetExerciseListQueryDto {
  constructor(
    public readonly q?: string | null,
    public readonly bodyPart?: string | null,
    public readonly equipment?: string | null
  ) {}
}
