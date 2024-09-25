import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FileHandler } from '@/utils/csv-handler'
import { errorHandler } from '@/utils/error-handler'

export const inputCsv = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const file = await request.saveRequestFiles()
  const registerBodySchema = z.object({
    fieldname: z.string(),
    filename: z.string(),
    mimetype: z.string().regex(/^text\/(csv)$/),
  })

  const fileBody = registerBodySchema.parse(file[0])
  const fileHandler = new FileHandler()

  let csvFile
  try {
    csvFile = await fileHandler.saveFile({ file: file[0] })

    return reply.status(201).send({
      fieldname,
      filename,
      path: csvFile?.csvPath,
      mimetype,
      id: csvFile?.csvId,
    })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
