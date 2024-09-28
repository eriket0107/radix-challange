import { compare, hash } from 'bcryptjs'

export class PasswordHandler {
  async hashPassword(password: string, salt: number): Promise<string> {
    return await hash(password, salt)
  }

  async comparePassword(
    password: string,
    passwordToCompare: string,
  ): Promise<boolean> {
    return await compare(password, passwordToCompare)
  }

  async verifiesStrongPassword(password: string): Promise<boolean> {
    const specialCharRegex = /[^a-zA-Z0-9]/
    return specialCharRegex.test(password) && password.length >= 8
  }
}
