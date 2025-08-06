import prisma from "../../../utils/prisma";
import { User, Gender } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class PrUserRepository implements UserRepository {

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(this.toDomain);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(
      user.id,
      user.email,
      user.nickName,
      user.password,
      user.age ?? undefined,
      user.gender as Gender,
      user.height ?? undefined,
      user.weight ?? undefined,
      user.isSocialLogin,
      user.characterColor,
      user.characterId,
      user.createdAt,
      user.updatedAt
    );
  }

  async save(user: User): Promise<User> {
    const savedUser = await prisma.user.create({
      data: {
        id: user.id,
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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
    return this.toDomain(savedUser);
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
          ...(userData.isSocialLogin !== undefined && { isSocialLogin: userData.isSocialLogin }),
          ...(userData.characterColor && { characterColor: userData.characterColor }),
          ...(userData.characterId !== undefined && { characterId: userData.characterId }),
          updatedAt: new Date()
        }
      });
      return this.toDomain(updatedUser);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
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
    );
  }
}