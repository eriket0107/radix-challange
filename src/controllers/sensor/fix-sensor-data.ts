import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { TyperOrmSensorRepository } from '@/repositories/typeorm/typerorm-sensor-repository'
import { FixSensorDataUseCase } from '@/use-cases/fix-sensor-data-use-case'
import { errorHandler } from '@/utils/error-handler'

export const fixSensorData = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const fixSensorDataBodySchema = z.object({
    filePath: z.string(),
  })

  const { filePath } = fixSensorDataBodySchema.parse(request.query)
  console.log(filePath)
  const sensorRepository = new TyperOrmSensorRepository()
  const fixSensorDataUserCase = new FixSensorDataUseCase(sensorRepository)

  try {
    const sensorsToUpdate = await fixSensorDataUserCase.execute({ filePath })
    return reply.status(201).send({ sensorsToUpdate })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
