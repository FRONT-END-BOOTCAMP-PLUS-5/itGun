export class GetExerciseListRequestDto {
  constructor(
    public readonly page?: number,
    public readonly limit?: number
  ) {}
}
