import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { sensorDataMock } from '@/mocks/sensorDataMock'
import { TyperOrmSensorRepository } from '@/repositories/typeorm/typerorm-sensor-repository'

dayjs.extend(utc)
dayjs.extend(timezone)

console.log('Starting seeding sensors...')
export const seedSensors = async () => {
  console.log('Creating repository to seed...')

  const sensorRepository = new TyperOrmSensorRepository()

  for (let i = 1; i <= 50; i++) {
    console.log('Loop repository to seed...', i)

    const sensor = {
      ...sensorDataMock(i),
    }
    console.log('Sensor seed...', sensor)

    await sensorRepository.register(sensor)
  }
}

console.log('Finished seeding sensors...')
