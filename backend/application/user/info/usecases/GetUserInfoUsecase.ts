import { PrUserRepository } from "../../../../infrastructure/repositories/PrUserRepository"
import { GetUserInfoResponseDto } from "../dtos/GetUserInfoResponseDto"
import { GetUserInfoRequestDto } from "../dtos/GetUserInfoRequestDto"

export class GetUserInfoUsecase {
  constructor(private userRepository: PrUserRepository) {}

  async execute(
    request: GetUserInfoRequestDto
  ): Promise<GetUserInfoResponseDto | null> {
    const user = await this.userRepository.findById(request.userId)
    if (!user) return null
    return {
      userId: user.id,
      email: user.email,
      nickName: user.nickName,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      characterId: user.characterId,
      characterColor: user.characterColor,
    } as GetUserInfoResponseDto;
  }
}
