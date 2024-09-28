import { randomUUID } from 'crypto'
import { Role, User } from 'database/entities/User'

import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  private dataBase: User[] = []

  async register({
    email,
    name,
    password,
  }: {
    name: string
    email: string
    password: string
  }): Promise<User> {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      role: 'USER' as Role,
    }
    this.dataBase.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.dataBase.find((user) => user.email === email) || null

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.dataBase.find((user) => user.id === id) || null

    return user
  }
}
