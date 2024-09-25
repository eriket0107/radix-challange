import { FastifyInstance } from 'fastify'

import { register } from './register'
import { seedSensorData } from './seed-sensor-data'

export const sensorRoutes = async (app: FastifyInstance) => {
  app.post('/register', register)
  app.post('/seed-sensor-data', seedSensorData)
}
