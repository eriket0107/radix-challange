import { TyperOrmSensorRepository } from '@/repositories/typeorm/typerorm-sensor-repository'
import { FixSensorDataUseCase } from '@/use-cases/fix-sensor-data-use-case'

export const makeFixSensorData = () => {
  const sensorRepository = new TyperOrmSensorRepository()
  const fixSensorDataUserCase = new FixSensorDataUseCase(sensorRepository)

  return fixSensorDataUserCase
}
