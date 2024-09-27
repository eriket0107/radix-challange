import { Sensor } from 'database/entities/Sensor'

import { SensorRepository } from '@/repositories/sensor-repository'
import { FileHandler } from '@/utils/csv-handler'

import { FixDataError } from '../errors/fix-data-error'

let sensorDataToSave: Sensor
let fixedSensorData: Sensor
export class FixSensorDataUseCase {
  constructor(private sensorRepository: SensorRepository) {}

  async execute({ filePath }: { filePath: string }) {
    const allSensorData = await this.sensorRepository.listAll()
    const sensorsToUpdate = allSensorData.filter(
      (val) => val.equipmentId === null || val.timestamp === '' || !val.value,
    )
    const filedHandler = new FileHandler()

    const csvFile = (await filedHandler.parseFile({
      path: filePath,
    })) as Array<Sensor>

    for (const sensorToUpdate of sensorsToUpdate) {
      for (const csv of csvFile) {
        if (csv.equipmentId === sensorToUpdate.equipmentId) {
          sensorDataToSave = csv
        }
      }

      if (!sensorDataToSave || !sensorsToUpdate) throw new FixDataError()

      fixedSensorData = await this.sensorRepository.update({
        sensorData: sensorToUpdate,
        sensorDataToSave,
      })
    }

    return { fixedSensorData }
  }
}
