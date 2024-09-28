import { FastifyReply, FastifyRequest } from 'fastify'

import { errorHandler } from '@/utils/error-handler'

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    reply.clearCookie('token')
    reply.clearCookie('refreshToken')

    return reply
      .status(200)
      .send({ message: 'Logged out successfully.' })
      .redirect('/')
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
