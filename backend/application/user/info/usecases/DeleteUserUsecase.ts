import { UserRepository } from "@/backend/domain/repositories/UserRepository"
import { DeleteUserDto } from "../dtos/DeleteUserDto"

export class DeleteUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: DeleteUserDto): Promise<void> {
    return this.userRepository.delete(request.userId)
  }
}
