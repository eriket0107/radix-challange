import { TypeOrmUserRepository } from '@/repositories/typeorm/typeorm-user-repository'
import { RegisterUserUseCase } from '@/use-cases/user/register-use-case'
import { PasswordHandler } from '@/utils/password-handler'

export const makeRegisterUser = () => {
  const userRepository = new TypeOrmUserRepository()
  const passwordHandler = new PasswordHandler()
  const registerUserUseCase = new RegisterUserUseCase(
    userRepository,
    passwordHandler,
  )

  return registerUserUseCase
}
