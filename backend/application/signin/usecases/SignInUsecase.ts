import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import { TokenRepository } from "../../../domain/repositories/TokenRepository"
import { SignInRequestDto } from "../dtos/SignInRequestDto"
import { SignInResponseDto } from "../dtos/SignInResponseDto"
import bcrypt from "bcryptjs"

export class SignInUsecase {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute(dto: SignInRequestDto): Promise<SignInResponseDto> {
    try {
      const validationResult = this.validateInput(dto)
      if (validationResult) return validationResult

      const user = await this.findUserByEmail(dto.email)
      if (!user) {
        return {
          message: "이메일 또는 비밀번호가 잘못되었습니다.",
          status: 401,
        }
      }

      const isPasswordValid = await this.verifyPassword(
        dto.password,
        user.password
      )
      if (!isPasswordValid) {
        return {
          message: "이메일 또는 비밀번호가 잘못되었습니다.",
          status: 401,
        }
      }

      // 🎯 토큰 생성
      const tokens = this.tokenRepository.generateTokenPair({
        userId: user.id,
      })

      return {
        message: "로그인이 완료되었습니다.",
        status: 200,
        user: {
          id: user.id,
          email: user.email,
          nickName: user.nickName,
          age: user.age,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          characterColor: user.characterColor,
          characterId: user.characterId,
        },
        tokens,
      }
    } catch (error) {
      return {
        message: "서버 오류가 발생했습니다.",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private validateInput(dto: SignInRequestDto): SignInResponseDto | null {
    if (!dto.email) {
      return { message: "필수값 누락: email", status: 400 }
    }
    if (!dto.password) {
      return { message: "필수값 누락: password", status: 400 }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email)) {
      return { message: "올바른 이메일 형식이 아닙니다.", status: 400 }
    }

    return null
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email)
  }

  private async verifyPassword(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword)
  }
}
