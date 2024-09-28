import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credencials-error'
import { PasswordHandler } from '@/utils/password-handler'

import { AuthenticateUseCase } from '.'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase
let passwordHandler: PasswordHandler

describe('Register User Use Case', () => {
  beforeEach(() => {
    passwordHandler = new PasswordHandler()
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository, passwordHandler)
  })
  it('should be able to authenticate a user', async () => {
    await userRepository.register({
      name: 'John Doe',
      email: 'YtKpZ@example.com',
      password: await passwordHandler.hashPassword('123456!@', 6),
    })

    const { user } = await sut.execute({
      email: 'YtKpZ@example.com',
      password: '123456!@',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.password).toEqual(expect.any(String))
    expect(user.role).toEqual(expect.any(String))
    expect(user.name).toEqual(expect.any(String))
  })

  it('should not be able to auth with invalide credentials', async () => {
    await userRepository.register({
      name: 'John Doe',
      email: 'YtKpZ@example.com',
      password: '123456!@',
    })

    expect(
      async () =>
        await sut.execute({
          email: 'YtKpZ@example.com',
          password: '123456!@',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
