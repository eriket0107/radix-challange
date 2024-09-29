import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetMeanByPeriod } from '@/factories/make-get-mean-by-period'
import { errorHandler } from '@/utils/error-handler'

export const meanByPeriod = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const getMeanByPeriodUseCase = makeGetMeanByPeriod()

  try {
    const meanByPeriod = await getMeanByPeriodUseCase.execute()

    return reply.status(200).send(meanByPeriod)
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: mean by period',
    })
  }
}
