import { FastifyInstance } from 'fastify'

import { inputCsv } from './input-csv'

export const csvRoutes = async (app: FastifyInstance) => {
  app.post('/input-csv', inputCsv)
}
