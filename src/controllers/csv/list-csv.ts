import { FastifyReply, FastifyRequest } from 'fastify'

import { makeListCsv } from '@/factories/make-csv-list'
import { errorHandler } from '@/utils/error-handler'

export const listCsv = async (_: FastifyRequest, reply: FastifyReply) => {
  const listCsvUseCase = makeListCsv()
  const csvFiles = await listCsvUseCase.execute()

  try {
    return reply.status(200).send(csvFiles)
  } catch (error) {
    errorHandler({ error, reply, code: 400, file: 'controller: listCsv' })
  }
}
