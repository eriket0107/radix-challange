import { SensorRepository } from '@/repositories/sensor-repository'
import { FileHandler } from '@/utils/csv-handler'

export class FixSensorDataUseCase {
  constructor(private sensorRepository: SensorRepository) {}

  async execute({ filePath }: { filePath: string }) {
    const allSensorData = await this.sensorRepository.listAll()
    const sensorsToUpdate = allSensorData.filter(
      (val) => val.equipmentId === null || val.timestamp === '' || !val.value,
    )
    const filedHandler = new FileHandler()

    console.log(await filedHandler.parseFile({ path: filePath }))

    // const sensorsToUpdate = Object.entries(allSensorData).reduce(
    //   (acc: { [key: string]: any }, [id, sensor]) => {
    //     const hasEmptyFields = Object.values(sensor).some(
    //       (val) => val == null || val === '',
    //     )
    //     if (hasEmptyFields) {
    //       acc[id] = sensor
    //     }
    //     return acc
    //   },
    //   {},
    // )

    return sensorsToUpdate
  }
}
