import { Sensor } from 'database/entities/Sensor'

export interface SensorRepository {
  register(sensorData: Sensor): Promise<Sensor>
  findByEquipmentId(equipmentId: string): Promise<Sensor | null>
  findIfExistsRegister({
    equipmentId,
    timestamp,
  }: {
    equipmentId: string
    timestamp: string
  }): Promise<Sensor | null>
  findEmptyRegisters(): Promise<Sensor[]>
  listAll(): Promise<Sensor[]>
  update({
    sensorData,
    sensorDataToSave,
  }: {
    sensorData: Sensor
    sensorDataToSave: Sensor
  }): Promise<Sensor>
}
