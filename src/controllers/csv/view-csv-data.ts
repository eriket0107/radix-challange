import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FileHandler } from '@/utils/csv-handler'
import { errorHandler } from '@/utils/error-handler'

export const viewCsvData = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parseBodySchema = z.object({
    filePath: z.string(),
  })
  const { filePath } = parseBodySchema.parse(request.query)
  const csvHandler = new FileHandler()

  try {
    const csvData = await csvHandler.parseFile({ path: filePath })
    return reply.status(200).send(csvData)
  } catch (error) {
    errorHandler({ error, reply, code: 400, file: 'controller: view csv data' })
  }
}
