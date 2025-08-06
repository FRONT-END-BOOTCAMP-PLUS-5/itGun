import { User } from '../entities/User';

export interface UserInfoRepository {
  findUserInfoById(id: string): Promise<User | null>;
} 