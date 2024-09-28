import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticacation } from '@/factories/make-authentication'
import { errorHandler } from '@/utils/error-handler'

export const authentication = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const autheticationBodySchema = z.object({
      email: z.string().email('Invalid email'),
      password: z.string(),
    })
    const { email, password } = autheticationBodySchema.parse(request.body)
    const authenticateUseCase = makeAuthenticacation()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      { sub: user.id, role: user.role },
      {
        sign: {
          expiresIn: '10m',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { sub: user.id, role: user.role },
      {
        sign: {
          expiresIn: '1d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
