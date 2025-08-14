export class Exercise {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly nameKo: string,
    public readonly imageUrl: string,
    public readonly videoUrl: string,
    public readonly equipments: string[],
    public readonly equipmentsKo: string[],
    public readonly bodyParts: string[],
    public readonly bodyPartsKo: string[],
    public readonly exerciseType: string,
    public readonly keywords: string[],
    public readonly keywordsKo: string[],
    public readonly overview: string,
    public readonly overviewKo: string,
    public readonly instructions: string[],
    public readonly instructionsKo: string[],
    public readonly exerciseTips: string[],
    public readonly exerciseTipsKo: string[],
    public readonly variations: string[],
    public readonly relatedExerciseIds: string[]
  ) {}
}
