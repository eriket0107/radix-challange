import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

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
      equipmentId: `EQ-${Math.floor(10000 + Math.random() * 90000)}`, // Random equipmentId
      value: Number((Math.random() * 100).toFixed(2)), // Random value between 0 and 100
      timestamp: dayjs().add(i, 'days').format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    }
    console.log('Sensor seed...', sensor)

    await sensorRepository.register(sensor)
  }
}

console.log('Finished seeding sensors...')
