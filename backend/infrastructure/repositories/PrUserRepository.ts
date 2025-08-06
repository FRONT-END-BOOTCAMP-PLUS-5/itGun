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

  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
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
    return this.toDomain(createdUser)
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...(userData.email && { email: userData.email }),
          ...(userData.nickName && { nickName: userData.nickName }),
          ...(userData.password && { password: userData.password }),
          ...(userData.age !== undefined && { age: userData.age }),
          ...(userData.gender && { gender: userData.gender }),
          ...(userData.height !== undefined && { height: userData.height }),
          ...(userData.weight !== undefined && { weight: userData.weight }),
          ...(userData.isSocialLogin !== undefined && {
            isSocialLogin: userData.isSocialLogin,
          }),
          ...(userData.characterColor && {
            characterColor: userData.characterColor,
          }),
          ...(userData.characterId !== undefined && {
            characterId: userData.characterId,
          }),
          updatedAt: new Date(),
        },
      })
      return this.toDomain(updatedUser)
    } catch (error) {
      return null
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
