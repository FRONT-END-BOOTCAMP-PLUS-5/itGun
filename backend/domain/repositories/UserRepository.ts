import { User } from "../entities/User"

export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findCharacterInfoById(id: string): Promise<{ id: number; color: string }>
  save(user: User): Promise<User>
  update(id: string, user: Partial<User>): Promise<User | null>
  delete(id: string): Promise<boolean>
}
