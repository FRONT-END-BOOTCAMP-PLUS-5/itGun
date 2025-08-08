import { User } from "../entities/User"

export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findCharacterInfoById(id: string): Promise<{ id: number; color: string }>
  save(user: User): Promise<User>
  update(user: Partial<User>): Promise<void>
  delete(id: string): Promise<void>
  findByEmail(email: string): Promise<User | null>
}
