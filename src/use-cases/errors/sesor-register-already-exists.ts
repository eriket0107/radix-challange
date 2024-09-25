export class SensorDataAlreadyExistsError extends Error {
  constructor() {
    super('Sensor data already exists.')
  }
}
