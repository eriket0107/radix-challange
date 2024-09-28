import { TyperOrmSensorRepository } from '@/repositories/typeorm/typerorm-sensor-repository'
import { GetMeanByPeriodUseCase } from '@/use-cases/sensor/get-mean-by-period-use-case'

export const makeGetMeanByPeriod = () => {
  const sensorRepository = new TyperOrmSensorRepository()
  const getMeanByPeriodUseCase = new GetMeanByPeriodUseCase(sensorRepository)

  return getMeanByPeriodUseCase
}
