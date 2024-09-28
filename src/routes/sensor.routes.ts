import { FastifyInstance } from 'fastify'

import { fixSensorData } from '@/controllers/sensor/fix-sensor-data'
import { meanByPeriod } from '@/controllers/sensor/mean-by-period'
import { register } from '@/controllers/sensor/register'
import { seedSensorData } from '@/controllers/sensor/seed-sensor-data'

export const sensorRoutes = async (app: FastifyInstance) => {
  app.post('/sensor-register', register)
  app.post('/seed-sensor-data', seedSensorData)
  app.get('/fix-sensor-data', fixSensorData)
  app.get('/mean-by-period', meanByPeriod)
}
