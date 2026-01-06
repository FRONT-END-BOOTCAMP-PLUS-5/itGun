import { UserRepository } from "@/backend/domain/repositories/UserRepository"
import { PostUserPasswordRequestDto } from "../dtos/PostUserPasswordRequestDto"

export class PostUserPasswordUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: PostUserPasswordRequestDto): Promise<string | null> {
    return this.userRepository.findPasswordById(request.id)
  }
}
