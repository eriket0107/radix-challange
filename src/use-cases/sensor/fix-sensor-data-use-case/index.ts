import { Sensor } from 'database/entities/Sensor'

import { SensorRepository } from '@/repositories/sensor-repository'
import { CSVReadFileError } from '@/use-cases/errors/csv-read-file-error'
import { EmptyFilePathError } from '@/use-cases/errors/empty-file-path-error'
import { FixDataError } from '@/use-cases/errors/fix-data-error'
import { FileHandler } from '@/utils/csv-handler'

let sensorDataToSave: Sensor
let fixedSensorData: Sensor
export class FixSensorDataUseCase {
  constructor(private sensorRepository: SensorRepository) {}

  async execute({ filePath }: { filePath: string }) {
    if (!filePath) throw new EmptyFilePathError()

    const allSensorData = await this.sensorRepository.listAll()
    const sensorsToUpdate = allSensorData.filter(
      (val) => val.equipmentId === null || val.timestamp === '' || !val.value,
    )
    const filedHandler = new FileHandler()

    const csvFile = (await filedHandler.parseFile({
      path: filePath,
    })) as Array<Sensor>

    if (!csvFile.length || !csvFile) throw new CSVReadFileError()

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
