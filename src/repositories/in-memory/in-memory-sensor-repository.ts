import { randomUUID } from 'node:crypto'

import { Sensor } from 'database/entities/Sensor'
import dayjs from 'dayjs'

import { SensorRepository } from '../sensor-repository'

export class InMemorySensorRepository implements SensorRepository {
  private dataBase: Sensor[] = []

  async register(sensorData: Sensor): Promise<Sensor> {
    const sensorRegister: Sensor = {
      id: randomUUID(),
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
      ...sensorData,
    }

    this.dataBase.push(sensorData)
    return sensorRegister
  }

  async findByEquipmentId(equipmentId: string): Promise<Sensor | null> {
    const sensor =
      this.dataBase.find((sensor) => sensor.equipmentId === equipmentId) || null

    return sensor
  }

  async findIfExistsRegister({
    equipmentId,
    timestamp,
  }: {
    equipmentId: string
    timestamp: string
  }): Promise<Sensor | null> {
    const sensor =
      this.dataBase.find(
        (sensor) =>
          sensor.equipmentId === equipmentId && sensor.timestamp === timestamp,
      ) || null

    return sensor
  }
}
