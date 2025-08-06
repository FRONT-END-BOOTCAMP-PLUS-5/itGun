import { User } from "../entities/User"

export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  create(user: User): Promise<User>
  update(id: string, user: Partial<User>): Promise<User | null>
  delete(id: string): Promise<boolean>
  findByEmail(email: string): Promise<User | null>
}
