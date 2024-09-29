import { seedSensors } from 'database/seeds/sensor-data'
import { FastifyReply, FastifyRequest } from 'fastify'

import { errorHandler } from '@/utils/error-handler'

export const seedSensorData = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await seedSensors()
    return reply.status(201).send({ message: 'ok' })
  } catch (error) {
    console.log(error)
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: seedSensorData',
    })
  }
}
