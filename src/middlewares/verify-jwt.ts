import { FastifyReply, FastifyRequest } from 'fastify'

import { errorHandler } from '@/utils/error-handler'

export const verifyJwt = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    console.log('teste', request)
    await request.jwtVerify()
  } catch (err) {
    return errorHandler({
      error: err,
      reply,
      code: 401,
      redirectTo: '/',
      file: 'middleware: verify jwt',
    })
  }
}
