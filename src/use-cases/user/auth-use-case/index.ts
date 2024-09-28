import { User } from 'database/entities/User'

import { UserRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credencials-error'
import { PasswordHandler } from '@/utils/password-handler'

type AutheticateUseCaseRequest = {
  email: string
  password: string
}

type AutheticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UserRepository,
    private passwordHandler: PasswordHandler,
  ) {}

  async execute({
    email,
    password,
  }: AutheticateUseCaseRequest): Promise<AutheticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatches = await this.passwordHandler.comparePassword(
      password,
      user.password as string,
    )

    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    return {
      user,
    }
  }
}
