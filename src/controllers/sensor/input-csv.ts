import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FileHandler } from '@/utils/csv-handler'
import { errorHandler } from '@/utils/error-handler'

export const inputCsv = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const file = await request.saveRequestFiles()
  console.log(file[0])
  const registerBodySchema = z.object({
    fieldname: z.string(),
    filename: z.string(),
    mimetype: z.string().regex(/^text\/(csv)$/),
  })

  const { fieldname, filename, mimetype } = registerBodySchema.parse(file[0])
  console.log({ fieldname, filename, mimetype })
  const fileHandler = new FileHandler()

  try {
    await fileHandler.saveFile({ file: file[0] })

    return reply.status(201).send({ fieldname, filename, mimetype })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
