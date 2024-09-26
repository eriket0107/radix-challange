import { FastifyInstance } from 'fastify'

import { inputCsv } from './input-csv'
import { listCsv } from './list-csv'

export const csvRoutes = async (app: FastifyInstance) => {
  app.post('/input-csv', inputCsv)
  app.get('/list-csv', listCsv)
}
