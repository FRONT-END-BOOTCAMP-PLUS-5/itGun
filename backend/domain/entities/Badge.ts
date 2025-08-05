export class Badge {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly expirationDays: number | null,
    public readonly description: string
  ) {}
}
