export class GetExerciseListQueryDto {
  constructor(
    public readonly q?: string | null,
    public readonly bodyPart?: string | null,
    public readonly equipment?: string | null,
    public readonly page?: number | null,
    public readonly limit?: number | null
  ) {}
}
