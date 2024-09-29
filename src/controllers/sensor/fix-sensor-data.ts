import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFixSensorData } from '@/factories/make-fix-sensor-data'
import { errorHandler } from '@/utils/error-handler'

export const fixSensorData = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const fixSensorDataBodySchema = z.object({
    filePath: z.string(),
  })

  const { filePath } = fixSensorDataBodySchema.parse(request.body)

  const fixSensorDataUserCase = makeFixSensorData()

  try {
    const sensorsToUpdate = await fixSensorDataUserCase.execute({ filePath })
    return reply.status(201).send({ sensorsToUpdate })
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller fix sensor data',
    })
  }
}
