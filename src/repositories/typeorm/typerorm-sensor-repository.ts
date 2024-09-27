import { dataSource } from 'database/data-source'
import { Sensor } from 'database/entities/Sensor'
import { Repository } from 'typeorm'

import { SensorRepository } from '../sensor-repository'

export class TyperOrmSensorRepository implements SensorRepository {
  private repository: Repository<Sensor> = dataSource.getRepository(Sensor)

  async findByEquipmentId(equipmentId: string): Promise<Sensor | null> {
    const sensor = await this.repository.findOne({
      where: { equipmentId },
    })

    return sensor
  }

  async findIfExistsRegister({
    equipmentId,
    timestamp,
  }: {
    equipmentId: string
    timestamp: string
  }): Promise<Sensor | null> {
    const sensor = await this.repository.findOne({
      where: { equipmentId, timestamp },
    })

    return sensor
  }

  async register(sensorData: Sensor): Promise<Sensor> {
    const sensor = await this.repository.save(sensorData)

    return sensor
  }

  async listAll(): Promise<Sensor[]> {
    const sensorData = await this.repository.find()

    return sensorData
  }

  async update({
    sensorData,
    sensorDataToSave,
  }: {
    sensorData: Sensor
    sensorDataToSave: Sensor
  }): Promise<Sensor> {
    const dataToUpdate = await this.repository.findOne({
      where: { equipmentId: sensorData.equipmentId },
    })

    if (!dataToUpdate) throw new Error('Error when updating data')

    console.log('antes', dataToUpdate)
    Object.assign(dataToUpdate, sensorDataToSave)
    console.log('depois', dataToUpdate)
    return this.repository.save(dataToUpdate)
  }

  async findEmptyRegisters(): Promise<Sensor[]> {
    const sensorsToUpdate = await this.repository
      .createQueryBuilder('sensor')
      .where({
        timestamp: '',
      })
      .orWhere({ value: 0 })
      .orWhere({ equipmentId: '' })
      .getMany()

    return sensorsToUpdate
  }
}
