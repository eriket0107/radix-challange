import 'reflect-metadata'

import { dataSource } from 'database/data-source'

import { app } from '@/app'

const port = 3333

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

app
  .listen({ port })
  .then(() => {
    console.log(`🚀 Server running on port: ${port}!`)
  })
  .catch((error) => console.error(error))
