import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/middlewares/verify-jwt'

import { inputCsv } from '../controllers/csv/input-csv'
import { listCsv } from '../controllers/csv/list-csv'
import { viewCsvData } from '../controllers/csv/view-csv-data'

export const csvRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt)

  app.post('/input-csv', inputCsv)
  app.get('/list-csv', listCsv)
  app.get('/view-csv-data/:filePath', viewCsvData)
}
