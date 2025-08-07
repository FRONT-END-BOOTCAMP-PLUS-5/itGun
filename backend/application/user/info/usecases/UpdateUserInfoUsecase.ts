import { UserRepository } from "@/backend/domain/repositories/UserRepository"
import { UpdateUserInfoDto } from "../dtos/UpdateUserInfoDto"

export class UpdateUserInfoUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: UpdateUserInfoDto): Promise<void> {
    return this.userRepository.update(request)
  }
}
