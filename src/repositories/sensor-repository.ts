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
}
