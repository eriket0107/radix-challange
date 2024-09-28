import { TypeOrmUserRepository } from '@/repositories/typeorm/typeorm-user-repository'
import { AuthenticateUseCase } from '@/use-cases/user/auth-use-case'
import { PasswordHandler } from '@/utils/password-handler'

export const makeAuthenticacation = () => {
  const userRepository = new TypeOrmUserRepository()
  const passwordHandler = new PasswordHandler()
  const authenticateUseCase = new AuthenticateUseCase(
    userRepository,
    passwordHandler,
  )

  return authenticateUseCase
}
