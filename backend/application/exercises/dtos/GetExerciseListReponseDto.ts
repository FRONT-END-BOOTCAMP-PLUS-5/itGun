export class GetExerciseListReponseDto {
  constructor(
    public readonly data: ExerciseDto[],
    public readonly meta?: {
      total: number
      hasNextPage: boolean
      hasPreviousPage: boolean
      page: number
    }
  ) {}
}

export class ExerciseDto {
  constructor(
    public readonly exerciseId: string,
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly videoUrl: string,
    public readonly equipments: string[],
    public readonly bodyParts: string[],
    public readonly exerciseType: string,
    public readonly keywords: string[],
    public readonly overview: string,
    public readonly instructions: string[],
    public readonly exerciseTips: string[],
    public readonly variations: string[],
    public readonly relatedExerciseIds: string[]
  ) {}
}
