import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

type RolesToVerify = 'ADMIN' | 'USER'

export const verifyUserRole = (roleToVerify: RolesToVerify[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const requestValidationSchema = z.object({
      role: z.string(),
    })

    const { role } = requestValidationSchema.parse(request.user)
    const userRole = role as RolesToVerify
    if (!roleToVerify.includes(userRole)) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
