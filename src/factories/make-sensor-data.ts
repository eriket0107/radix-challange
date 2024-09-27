import { TyperOrmSensorRepository } from '@/repositories/typeorm/typerorm-sensor-repository'
import { RegisterSensorDataUseCase } from '@/use-cases/sensor/register-sensor-data-use-case'

export const makeRegisterSensorData = () => {
  const sensorRepository = new TyperOrmSensorRepository()

  const createOrganizationUseCase = new RegisterSensorDataUseCase(
    sensorRepository,
  )

  return createOrganizationUseCase
}
