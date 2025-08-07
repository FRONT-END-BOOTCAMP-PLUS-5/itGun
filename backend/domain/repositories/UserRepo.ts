import { User } from "../entities/User"

export interface UserRepo {
  findById(id: string): Promise<User | null>
}
