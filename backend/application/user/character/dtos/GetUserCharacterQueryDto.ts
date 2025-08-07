export class GetUserCharacterQueryDto {
  constructor(
    public userId: string,
    public date?: string | null // yymmdd
  ) {}
}
