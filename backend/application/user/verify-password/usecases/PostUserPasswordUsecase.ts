import { UserRepository } from "@/backend/domain/repositories/UserRepository"
import { PostUserPasswordRequestDto } from "../dtos/PostUserPasswordRequestDto"
import bcrypt from "bcryptjs"
import { PostUserPasswordResponseDto } from "../dtos/PostUserPasswordResponseDto"

export class PostUserPasswordUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    request: PostUserPasswordRequestDto
  ): Promise<PostUserPasswordResponseDto | null> {
    const oldHashedPassword = await this.userRepository.findPasswordById(
      request.id
    )

    if (!oldHashedPassword) {
      return { valid: false }
    }
    const verifyPassword = await bcrypt.compare(
      request.newPassword,
      oldHashedPassword
    )
    return { valid: verifyPassword }
  }
}
