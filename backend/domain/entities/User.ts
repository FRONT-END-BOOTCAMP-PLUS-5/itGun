export enum Gender {
  NONE = "none",
  MALE = "male",
  FEMALE = "female"
}

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly nickName: string,
    public readonly password: string,
    public readonly age?: number,
    public readonly gender?: Gender,
    public readonly height?: number,
    public readonly weight?: number,
    public readonly isSocialLogin: boolean = false,
    public readonly characterColor: string = "#fdfdfd",
    public readonly characterId: number = 1,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
