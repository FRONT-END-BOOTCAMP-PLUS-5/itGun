export class PostUserPasswordRequestDto {
  constructor(
    public id: string,
    public newPassword: string
  ) {}
}
