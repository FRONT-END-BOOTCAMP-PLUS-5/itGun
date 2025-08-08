export class GetExerciseListDto {
  constructor(
    public readonly data: ExerciseDto[],
    public readonly meta?: {
      total: number
      hasNextPage: boolean
      hasPreviousPage: boolean
      nextCursor: string
    }
  ) {}
}

export class ExerciseDto {
  constructor(
    public readonly exerciseId: string,
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly videoUrl: string,
    public readonly bodyParts: string[],
    public readonly equipments: string[],
    public readonly instructions: string[],
    public readonly exerciseTips: string[]
  ) {}
}
