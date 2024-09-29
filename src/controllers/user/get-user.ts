import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetUserById } from '@/factories/make-get-user-by-id'
import { errorHandler } from '@/utils/error-handler'

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const getRequestUserSubBodySchema = z.object({
      sub: z.string(),
    })
    const { sub } = getRequestUserSubBodySchema.parse(request.user)
    console.log({ sub })

    const getUserByIdUseCase = makeGetUserById()

    const { user } = await getUserByIdUseCase.execute({ id: sub })

    return reply.status(200).send({ ...user, password: undefined })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
