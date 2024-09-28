import { FastifyInstance } from 'fastify'

import { register } from '@/controllers/user/register'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/user-register', register)
}
