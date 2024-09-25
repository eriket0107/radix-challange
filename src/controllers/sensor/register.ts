import dayjs from 'dayjs'
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

  const parseTimestampIntoDate = dayjs(timestamp).format(
    'YYYY-MM-DDTHH:mm:ssZ[Z]',
  )

  try {
    await registerSensorDataUserCase.execute({
      equipmentId,
      value,
      timestamp: parseTimestampIntoDate,
    })

    return reply.status(201).send({ message: 'ok' })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
