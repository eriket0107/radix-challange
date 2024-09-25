import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterSensorData } from '@/factories/make-sensor-data-factory'
import { errorHandler } from '@/utils/error-handler'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    equipmentId: z.string(),
    value: z.number(),
    timestamp: z.string(),
  })
  const { equipmentId, value, timestamp } = registerBodySchema.parse(
    request.body,
  )
  console.log({ equipmentId, value, timestamp })

  const registerSensorDataUserCase = makeRegisterSensorData()

  try {
    await registerSensorDataUserCase.execute({
      equipmentId,
      value,
      timestamp,
    })

    return reply.status(201).send({ message: 'ok' })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
