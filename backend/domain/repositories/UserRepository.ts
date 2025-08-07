import { User } from "../entities/User"

export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  save(user: User): Promise<User>
  update(user: Partial<User>): Promise<void>
  delete(id: string): Promise<boolean>
}
