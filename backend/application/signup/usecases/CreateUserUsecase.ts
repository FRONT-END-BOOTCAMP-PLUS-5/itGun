import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import { CreateAuthDto, CreateAuthResponseDto } from "../dtos/CreateAuthDto"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class CreateUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CreateAuthDto): Promise<CreateAuthResponseDto> {
    try {
      // 1. 입력값 검증
      const validationResult = this.validateInput(dto)
      if (validationResult) return validationResult

      // 2. 이메일 중복 확인
      const duplicateCheck = await this.checkDuplicateEmail(dto.email)
      if (duplicateCheck) return duplicateCheck

      // 3. 사용자 생성 및 저장
      const user = await this.createUser(dto)

      // 4. JWT 토큰 생성
      const tokens = this.generateTokens(user)

      // const userForTokens = new User(
      //   "", // id will be set by DB
      //   dto.email,
      //   dto.nickName,
      //   dto.password,
      //   dto.age,
      //   dto.gender,
      //   dto.height,
      //   dto.weight,
      //   false,
      //   dto.characterColor || "#fdfdfd",
      //   dto.characterId || 1
      // )
      // const tokens = this.generateTokens(userForTokens)

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

  private validateInput(dto: CreateAuthDto): CreateAuthResponseDto | null {
    if (!dto.email) {
      return { message: "필수값 누락: email", status: 400 }
    }
    if (!dto.password) {
      return { message: "필수값 누락: password", status: 400 }
    }
    if (!dto.nickName) {
      return { message: "필수값 누락: nickName", status: 400 }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(dto.email)) {
      return { message: "올바른 이메일 형식이 아닙니다.", status: 400 }
    }

    if (dto.password.length < 6) {
      return { message: "비밀번호는 최소 6자 이상이어야 합니다.", status: 400 }
    }

    if (dto.nickName.length < 2 || dto.nickName.length > 20) {
      return { message: "닉네임은 2자 이상 20자 이하여야 합니다.", status: 400 }
    }

    return null
  }

  private async checkDuplicateEmail(
    email: string
  ): Promise<CreateAuthResponseDto | null> {
    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      return { message: "이미 존재하는 이메일입니다.", status: 409 }
    }

    return null
  }

  private async createUser(dto: CreateAuthDto): Promise<User> {
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

    return await this.userRepository.create(user)
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
