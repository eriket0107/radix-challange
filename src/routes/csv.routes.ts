import { FastifyInstance } from 'fastify'

import { inputCsv } from '../controllers/csv/input-csv'
import { listCsv } from '../controllers/csv/list-csv'
import { viewCsvData } from '../controllers/csv/view-csv-data'

export const csvRoutes = async (app: FastifyInstance) => {
  app.post('/input-csv', inputCsv)
  app.get('/list-csv', listCsv)
  app.get('/view-csv-data/:filePath', viewCsvData)
}
