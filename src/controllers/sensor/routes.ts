import { FastifyInstance } from 'fastify'

import { register } from './register'
import { seedSensorData } from './seed-sensor-data'

export const sensorRoutes = async (app: FastifyInstance) => {
  app.post('/sensor', register)
  app.post('/seed-sensor-data', seedSensorData)
}
