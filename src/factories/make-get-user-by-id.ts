import { TypeOrmUserRepository } from '@/repositories/typeorm/typeorm-user-repository'
import { GetUserByIdUseCase } from '@/use-cases/user/get-user-by-id-use-case'

export const makeGetUserById = () => {
  const userRepository = new TypeOrmUserRepository()
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)

  return getUserByIdUseCase
}
