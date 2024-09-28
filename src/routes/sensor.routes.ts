import { FastifyInstance } from 'fastify'

import { fixSensorData } from '../controllers/sensor/fix-sensor-data'
import { register } from '../controllers/sensor/register'
import { seedSensorData } from '../controllers/sensor/seed-sensor-data'

export const sensorRoutes = async (app: FastifyInstance) => {
  app.post('/register', register)
  app.post('/seed-sensor-data', seedSensorData)
  app.get('/fix-sensor-data', fixSensorData)
}
