import prisma from "../../../utils/prisma"
import { User, Gender } from "../../domain/entities/User"
import { UserRepository } from "../../domain/repositories/UserRepository"

export class PrUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users.map(this.toDomain)
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user ? this.toDomain(user) : null
  }

  async findCharacterInfoById(
    id: string
  ): Promise<{ id: number; color: string }> {
    const whereCondition = { id }
    const resultInfo = {
      id: 1,
      color: "#FDFDFD",
    }

    const characterInfo = await prisma.user.findUnique({
      where: whereCondition,
      select: {
        characterId: true,
        characterColor: true,
      },
    })

    if (characterInfo?.characterId) {
      resultInfo.id = characterInfo.characterId
    }
    if (characterInfo?.characterColor) {
      resultInfo.color = characterInfo.characterColor
    }

    return resultInfo
  }

  async save(user: User): Promise<User> {
    const savedUser = await prisma.user.create({
      data: {
        email: user.email,
        nickName: user.nickName,
        password: user.password,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        isSocialLogin: user.isSocialLogin,
        characterColor: user.characterColor,
        characterId: user.characterId,
      },
    })
    return this.toDomain(savedUser)
  }

  async update(userData: Partial<User>): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userData.id },
        data: {
          ...(userData.nickName && { nickName: userData.nickName }),
          ...(userData.password && { password: userData.password }),
          ...(userData.age !== undefined && { age: userData.age }),
          ...(userData.gender && { gender: userData.gender }),
          ...(userData.height !== undefined && { height: userData.height }),
          ...(userData.weight !== undefined && { weight: userData.weight }),
          ...(userData.characterColor && {
            characterColor: userData.characterColor,
          }),
          ...(userData.characterId !== undefined && {
            characterId: userData.characterId,
          }),
          updatedAt: new Date(),
        },
      })
    } catch (error) {
      throw new Error(`유저 정보 수정 실패: ${error}`)
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user ? this.toDomain(user) : null
  }

  private toDomain(user: any): User {
    return new User(
      user.id,
      user.email,
      user.nickName,
      user.password,
      user.age,
      user.gender as Gender,
      user.height,
      user.weight,
      user.isSocialLogin,
      user.characterColor,
      user.characterId,
      user.createdAt,
      user.updatedAt
    )
  }
}
