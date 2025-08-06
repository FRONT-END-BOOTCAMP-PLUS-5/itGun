import { PrUserRepository } from '../../../../infrastructure/repositories/PrUserRepository';
import { GetUserInfoRequestDto, GetUserInfoResponseDto } from '../dtos/GetUserInfoDto';

export class GetUserInfoUsecase {
  constructor(private userRepository: PrUserRepository) {}

  async execute(request: GetUserInfoRequestDto): Promise<GetUserInfoResponseDto | null> {
    const user = await this.userRepository.findById(request.userId);
    if (!user) return null;
    return {
      user_id: user.id,
      email: user.email,
      nick_name: user.nickName,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      characterId: user.characterId,
      characterColor: user.characterColor,
    };
  }
} 