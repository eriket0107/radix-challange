import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterUser } from '@/factories/make-user-register'
import { errorHandler } from '@/utils/error-handler'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const registerUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email('Invalid email'),
      password: z.string(),
    })
    const { name, email, password } = registerUserBodySchema.parse(request.body)
    const registerUserUseCase = makeRegisterUser()

    const user = await registerUserUseCase.execute({ name, email, password })
    return reply.status(201).send({ ...user, password: undefined })
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: user register',
    })
  }
}
