import path from 'node:path'

import sqlite3 from 'sqlite3'
import { DataSource } from 'typeorm'

import { env } from '@/env'

const databasePath =
  env.NODE_ENV === 'prod'
    ? env.DATABASE_URL
    : path.resolve('database', 'radix.sqlite')
const entitiesPath = path.resolve('database', 'entities', '*.ts')
const migrationsPath = path.resolve('database', 'migrations', '*.ts')

export const dataSource = new DataSource({
  type: 'sqlite',
  driver: sqlite3,
  database: databasePath,
  synchronize: false,
  logging: true,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  subscribers: [],
})
