import prisma from '../../../utils/prisma';
import { User, Gender } from '../../domain/entities/User';
import { UserInfoRepository } from '../../domain/repositories/UserInfoRepository';

export class PrUserInfoRepository implements UserInfoRepository {
  async findUserInfoById(id: string): Promise<User | null> {
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
} 