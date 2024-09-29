import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { errorHandler } from '@/utils/error-handler'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify({
      onlyCookie: true,
    })
  } catch (error) {
    return errorHandler({
      error,
      reply,
      code: 401,
      redirectTo: '/login',
      file: 'controller: verify jwt',
    })
  }

  const requestValidationSchema = z.object({
    sub: z.string(),
    role: z.string(),
  })

  const { sub, role } = requestValidationSchema.parse(request.user)

  try {
    const token = await reply.jwtSign(
      { sub, role },
      {
        sign: {
          expiresIn: '10m',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { sub, role },
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
    errorHandler({
      error,
      reply,
      code: 400,

      file: 'controller: refresh',
    })
  }
}
