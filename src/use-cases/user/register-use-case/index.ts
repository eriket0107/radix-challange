import { User } from 'database/entities/User'

import { UserRepository } from '@/repositories/user-repository'
import { StrongPasswordError } from '@/use-cases/errors/strong-password-error'
import { UserEmailAlreadyExistsError } from '@/use-cases/errors/user-email-already-exists-error'
import { PasswordHandler } from '@/utils/password-handler'

type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = Omit<User, 'password_hash'>

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHandler: PasswordHandler,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email)
    const hasStrogPassword =
      await this.passwordHandler.verifiesStrongPassword(password)

    if (emailAlreadyExists) throw new UserEmailAlreadyExistsError()

    if (!hasStrogPassword) throw new StrongPasswordError()

    const password_hash = await this.passwordHandler.hashPassword(password, 6)

    const user = await this.userRepository.register(name, email, password_hash)
    return user
  }
}
