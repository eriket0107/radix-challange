import { FastifyReply } from 'fastify'

export const errorHandler = ({
  error,
  reply,
  code = 400,
  message,
  redirectTo,
}: {
  error: unknown
  reply: FastifyReply
  code?: number
  message?: string
  redirectTo?: string
}) => {
  let errorMessage

  if (error instanceof Error) {
    errorMessage = message || error.message
    console.log('[ERROR] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', {
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
