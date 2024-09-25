import 'reflect-metadata'

import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { csvRoutes } from './controllers/csv/routes'
import { sensorRoutes } from './controllers/sensor/routes'
import { env } from './env'

export const app = fastify()

app.register(cors)
app.register(cookies)

app.register(multipart, {
  limits: {
    fieldNameSize: 100,
    fieldSize: 100,
    fields: 10,
    fileSize: 1000000,
    files: 10,
    parts: 1000,
  },
  attachFieldsToBody: true,
})

app.register(sensorRoutes)
app.register(csvRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }
  console.log(error)
  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
