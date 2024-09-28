import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { StrongPasswordError } from '@/use-cases/errors/strong-password-error'
import { UserEmailAlreadyExistsError } from '@/use-cases/errors/user-email-already-exists-error'
import { PasswordHandler } from '@/utils/password-handler'

import { RegisterUserUseCase } from '.'

let userRepository: InMemoryUserRepository
let sut: RegisterUserUseCase
let passwordHandler: PasswordHandler

describe('Register User Use Case', () => {
  beforeEach(() => {
    passwordHandler = new PasswordHandler()
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(userRepository, passwordHandler)
  })
  it('should be able to register a new user', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'YtKpZ@example.com',
      password: '123456!@',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.password).toEqual(expect.any(String))
    expect(user.role).toEqual(expect.any(String))
    expect(user.name).toEqual(expect.any(String))
  })

  it('should  be able to register a new user with an email that exists', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'YtKpZ@example.com',
      password: '123456!@',
    })

    expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email: 'YtKpZ@example.com',
          password: '123456!@',
        }),
    ).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
  })

  it('should  be able to register a new user with an weak password', async () => {
    expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email: 'YtKpZ@example.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(StrongPasswordError)
  })
})
