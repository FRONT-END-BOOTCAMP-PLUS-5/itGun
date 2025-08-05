export class GetBadgeDto {
  constructor(
    public id: number,
    public name: string,
    public expirationDays: number | null,
    public description: string
  ) {}
}
