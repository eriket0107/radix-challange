import { FastifyInstance } from 'fastify'

import { fixSensorData } from './fix-sensor-data'
import { meanByPeriod } from './mean-by-period'
import { register } from './register'
import { seedSensorData } from './seed-sensor-data'

export const sensorRoutes = async (app: FastifyInstance) => {
  app.post('/register', register)
  app.post('/seed-sensor-data', seedSensorData)
  app.get('/fix-sensor-data', fixSensorData)
  app.get('/mean-by-period', meanByPeriod)
}
