import { PrUserRepository } from "../../../../infrastructure/repositories/PrUserRepository"
import { CheckEmailRequestDto } from "../dtos/CheckEmailRequestDto"
import { CheckEmailResponseDto } from "../dtos/CheckEmailResponseDto"

export class CheckEmailUsecase {
  constructor(private userRepository: PrUserRepository) {}

  async execute(request: CheckEmailRequestDto): Promise<CheckEmailResponseDto> {
    try {
      const { email } = request

      if (!email) {
        return {
          status: 400,
          message: "이메일을 입력해주세요",
          isAvailable: false,
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return {
          status: 400,
          message: "올바른 이메일 형식이 아닙니다",
          isAvailable: false,
        }
      }

      const existingUser = await this.userRepository.findByEmail(email)

      if (existingUser) {
        return {
          status: 409,
          message: "이미 사용 중인 이메일입니다",
          isAvailable: false,
        }
      }

      return {
        status: 200,
        message: "사용 가능한 이메일입니다",
        isAvailable: true,
      }
    } catch (error) {
      return {
        status: 500,
        message: "서버 오류가 발생했습니다",
        isAvailable: false,
      }
    }
  }
}
