import { User } from 'database/entities/User'

import { UserRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credencials-error'

type AutheticateUseCaseRequest = {
  id: string
}

type AutheticateUseCaseResponse = {
  user: User
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    id,
  }: AutheticateUseCaseRequest): Promise<AutheticateUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new InvalidCredentialsError()

    return {
      user,
    }
  }
}
