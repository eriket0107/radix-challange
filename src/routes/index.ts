import { app } from '@/app'

import { csvRoutes } from './csv.routes'
import { sensorRoutes } from './sensor.routes'

export const routes = () => {
  app.register(csvRoutes)
  app.register(sensorRoutes)
}
