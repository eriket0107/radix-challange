import path from 'node:path'

import { DataSource } from 'typeorm'

const databasePath = path.resolve('database', 'radix.db')
const entitiesPath = path.resolve('database', 'entities', '*.ts')
const migrationsPath = path.resolve('database', 'migrations', '*.ts')

export const dataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: false,
  logging: true,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  subscribers: [],
})
