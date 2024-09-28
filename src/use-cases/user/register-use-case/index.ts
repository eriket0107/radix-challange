import { User } from 'database/entities/User'

import { UserRepository } from '@/repositories/user-repository'
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
    const password_hash = await this.passwordHandler.hashPassword(password, 6)
    console.log(name, email, password)
    const user = await this.userRepository.register(name, email, password_hash)
    return user
  }
}
