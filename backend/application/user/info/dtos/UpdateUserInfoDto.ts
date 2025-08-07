enum Gender {
  NONE = "none",
  MALE = "male",
  FEMALE = "female",
}

export class UpdateUserInfoDto {
  constructor(
    public id: string,
    public password?: string,
    public nickName?: string,
    public height?: number,
    public weight?: number,
    public age?: number,
    public gender?: Gender,
    public characterColor?: string,
    public characterId?: number
  ) {}
}
