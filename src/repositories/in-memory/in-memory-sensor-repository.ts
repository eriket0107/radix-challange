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

  async listAll(): Promise<Sensor[]> {
    const allData = this.dataBase
    return allData
  }

  async update({
    sensorData,
    sensorDataToSave,
  }: {
    sensorData: Sensor
    sensorDataToSave: Sensor
  }): Promise<Sensor> {
    const dataToUpdate = this.dataBase.find(
      (sensor) => sensor.equipmentId === sensorData.equipmentId,
    )

    if (!dataToUpdate) throw new Error('Error when updating data')

    Object.assign(dataToUpdate, sensorDataToSave)

    return dataToUpdate
  }

  async findEmptyRegisters(): Promise<Sensor[]> {
    const emptyRegisters = this.dataBase.filter(
      (sensor) => sensor.timestamp === '' && sensor.value === 0,
    )

    return emptyRegisters
  }

  async period({
    startDate,
    endDate,
  }: {
    startDate: string
    endDate: string
  }): Promise<Sensor[]> {
    const periodMean = this.dataBase.filter((sensor: Sensor) => {
      const sensorDateTimeStampe = sensor.timestamp?.split('T')[0]
      const timestamp = dayjs(sensorDateTimeStampe).format('YYYY-MM-DD')
      const sensorDate =
        dayjs(timestamp).isAfter(endDate) &&
        dayjs(timestamp).isBefore(startDate)

      return sensorDate
    })

    return periodMean
  }
}
