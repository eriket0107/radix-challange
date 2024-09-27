import { FastifyInstance } from 'fastify'

import { inputCsv } from './input-csv'
import { listCsv } from './list-csv'
import { viewCsvData } from './view-csv-data'

export const csvRoutes = async (app: FastifyInstance) => {
  app.post('/input-csv', inputCsv)
  app.get('/list-csv', listCsv)
  app.get('/view-csv-data/:filePath', viewCsvData)
}
