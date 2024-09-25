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
}
