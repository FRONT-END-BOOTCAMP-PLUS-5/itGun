import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import { CreateUserRequestDto } from "../dtos/CreateUserRequestDto"
import { CreateUserResponseDto } from "../dtos/CreateUserResponseDto"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class CreateUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    try {
      const validationResult = this.validateInput(dto)
      if (validationResult) return validationResult

      const duplicateCheck = await this.checkDuplicateEmail(dto.email)
      if (duplicateCheck) return duplicateCheck

      const user = await this.createUser(dto)

      const tokens = this.generateTokens(user)

      return {
        message: "회원가입이 완료되었습니다.",
        status: 201,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
    } catch (error) {
      return {
        message: "서버 오류가 발생했습니다.",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private validateInput(
    dto: CreateUserRequestDto
  ): CreateUserResponseDto | null {
    if (!dto.email) {
      return { message: "필수값 누락: email", status: 400 }
    }
    if (!dto.password) {
      return { message: "필수값 누락: password", status: 400 }
    }
    if (!dto.nickName) {
      return { message: "필수값 누락: nickName", status: 400 }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email)) {
      return { message: "올바른 이메일 형식이 아닙니다.", status: 400 }
    }

    if (
      dto.nickName.length < 1 ||
      dto.nickName.length > 20 ||
      !/^[a-zA-Z0-9가-힣]+$/.test(dto.nickName)
    ) {
      return { message: "닉네임은 1-20자, 특수문자 불가입니다.", status: 400 }
    }

    if (dto.password.length < 8 || dto.password.length > 20) {
      return { message: "비밀번호는 8-20자여야 합니다.", status: 400 }
    }

    const types = [/[!@#$%^&*(),.?":{}|<>]/, /[a-zA-Z]/, /\d/].filter((regex) =>
      regex.test(dto.password)
    )
    if (types.length < 2) {
      return {
        message:
          "비밀번호는 특수문자, 문자, 숫자 중 2가지 이상 포함해야 합니다.",
        status: 400,
      }
    }

    return null
  }

  private async checkDuplicateEmail(
    email: string
  ): Promise<CreateUserResponseDto | null> {
    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      return { message: "이미 존재하는 이메일입니다.", status: 409 }
    }

    return null
  }

  private async createUser(dto: CreateUserRequestDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user = new User(
      "", // DB에서 자동 생성되므로 빈 문자열
      dto.email,
      dto.nickName,
      hashedPassword,
      dto.age,
      dto.gender,
      dto.height,
      dto.weight,
      false,
      dto.characterColor || "#fdfdfd",
      dto.characterId || 1
    )

    return await this.userRepository.save(user)
  }

  private generateTokens(user: User): {
    accessToken: string
    refreshToken: string
  } {
    const jwtSecret = process.env.JWT_SECRET
    const refreshTokenSecret = process.env.JWT_REFRESH_SECRET

    if (!jwtSecret) {
      throw new Error("JWT_SECRET_NOT_SET")
    }

    if (!refreshTokenSecret) {
      throw new Error("JWT_REFRESH_SECRET_NOT_SET")
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        nickName: user.nickName,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        characterColor: user.characterColor,
        characterId: user.characterId,
        type: "access",
      },
      jwtSecret,
      { expiresIn: "2h" } // 2시간으로 단축
    )

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        type: "refresh",
      },
      refreshTokenSecret,
      { expiresIn: "2w" } // 2주로 단축
    )

    return { accessToken, refreshToken }
  }
}
