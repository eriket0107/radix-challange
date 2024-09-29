import { FastifyReply } from 'fastify'

export const errorHandler = ({
  error,
  reply,
  code = 400,
  message,
  redirectTo,
  file,
}: {
  error: unknown
  reply: FastifyReply
  code?: number
  message?: string
  redirectTo?: string
  file: string
}) => {
  let errorMessage

  if (error instanceof Error) {
    errorMessage = message || error.message
    console.log('[ERROR] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', {
      file,
      error: errorMessage,
    })

    if (redirectTo)
      reply.status(code).send({ error: errorMessage }).redirect(redirectTo)
    else reply.status(code).send({ error: errorMessage })

    throw error
  } else {
    console.error('Add some tool to track errors')
  }
}
