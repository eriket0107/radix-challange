import { FastifyInstance } from 'fastify'

import { register } from './register'

export const sensorRoutes = async (app: FastifyInstance) => {
  app.post('/sensor', register)
}
