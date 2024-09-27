import { Sensor } from 'database/entities/Sensor'

import { SensorRepository } from '@/repositories/sensor-repository'
import { SensorRegisterError } from '@/use-cases/errors/sensor-register-error'
import { SensorDataAlreadyExistsError } from '@/use-cases/errors/sesor-register-already-exists'

type SensorDataRequest = {
  equipmentId: string
  value: number
  timestamp: string
}

type SensorDataResponse = {
  sensorData: Sensor
}

export class RegisterSensorDataUseCase {
  constructor(private sensorRepository: SensorRepository) {}

  async execute({
    equipmentId,
    timestamp,
    value,
  }: SensorDataRequest): Promise<SensorDataResponse> {
    const verifiesIfExistsSensorDataRegister =
      await this.sensorRepository.findIfExistsRegister({
        equipmentId,
        timestamp,
      })

    if (verifiesIfExistsSensorDataRegister) {
      throw new SensorDataAlreadyExistsError()
    }

    const sensorData = await this.sensorRepository.register({
      equipmentId,
      value,
      timestamp,
    })

    if (!sensorData) {
      throw new SensorRegisterError()
    }

    return { sensorData }
  }
}
