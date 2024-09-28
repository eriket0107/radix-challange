import { User } from 'database/entities/User'

export interface UserRepository {
  register({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
