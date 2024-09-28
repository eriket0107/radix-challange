import { dataSource } from 'database/data-source'
import { User } from 'database/entities/User'
import { Repository } from 'typeorm'

import { UserRepository } from '../user-repository'

export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<User> = dataSource.getRepository(User)

  register(name: string, email: string, password: string): Promise<User> {
    const user = this.repository.save({
      name,
      email,
      password,
    })

    return user
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.repository.findOneBy({
      email,
    })

    return user
  }

  findById(id: string): Promise<User | null> {
    const user = this.repository.findOneBy({
      id,
    })

    return user
  }
}
