import { FastifyInstance } from 'fastify'

import { authentication } from '@/controllers/user/authetication'
import { logout } from '@/controllers/user/logout'
import { refresh } from '@/controllers/user/refresh'
import { register } from '@/controllers/user/register'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/user-register', register)
  app.post('/sessions', authentication)
  app.delete('/logout', logout)

  app.patch('/token/refresh', refresh)
}
