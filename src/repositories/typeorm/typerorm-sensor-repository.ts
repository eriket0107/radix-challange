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

    Object.assign(dataToUpdate, sensorDataToSave)

    return this.repository.save(dataToUpdate)
  }

  async findEmptyRegisters(): Promise<Sensor[]> {
    const sensorsToUpdate = await this.repository
      .createQueryBuilder('sensor')
      .where({
        timestamp: '',
      })
      .orWhere({ value: 0 || null })
      .orWhere({ equipmentId: null })
      .getMany()

    return sensorsToUpdate
  }

  async period({
    startDate,
    endDate,
  }: {
    startDate: string
    endDate: string
  }): Promise<Sensor[]> {
    const period = await this.repository
      .createQueryBuilder('sensor')
      .where('timestamp <= :startDate', { startDate })
      .andWhere('timestamp >= :endDate', { endDate })
      .orderBy('timestamp', 'DESC')
      .getMany()

    return period
  }
}
