import { FastifyInstance } from 'fastify'

import { fixSensorData } from '@/controllers/sensor/fix-sensor-data'
import { meanByPeriod } from '@/controllers/sensor/mean-by-period'
import { register } from '@/controllers/sensor/register'
import { seedSensorData } from '@/controllers/sensor/seed-sensor-data'
import { verifyJwt } from '@/middlewares/verify-jwt'
import { verifyUserRole } from '@/middlewares/verify-user-role'

export const sensorRoutes = async (app: FastifyInstance) => {
  app.post('/sensor-register', register)
  app.post(
    '/seed-sensor-data',
    { onRequest: [verifyJwt, verifyUserRole(['ADMIN'])] },
    seedSensorData,
  )
  app.get('/fix-sensor-data', { onRequest: [verifyJwt] }, fixSensorData)
  app.get('/mean-by-period', { onRequest: [verifyJwt] }, meanByPeriod)
}
