import { FastifyInstance } from 'fastify'

import { inputCsv } from './input-csv'
import { register } from './register'
import { seedSensorData } from './seed-sensor-data'

export const sensorRoutes = async (app: FastifyInstance) => {
  app.post('/register', register)
  app.post('/seed-sensor-data', seedSensorData)
  app.post('/input-csv', inputCsv)
}
