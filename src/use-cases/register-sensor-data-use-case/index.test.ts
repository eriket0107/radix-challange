import { beforeEach, describe, expect, it } from 'vitest'

import { sensorDataMock } from '@/mocks/sensorDataMock'
import { InMemorySensorRepository } from '@/repositories/in-memory/in-memory-sensor-repository'

import { SensorDataAlreadyExistsError } from '../errors/sesor-register-already-exists'
import { RegisterSensorDataUseCase } from '.'

let sensorRepository: InMemorySensorRepository
let sut: RegisterSensorDataUseCase

describe('Register Sensor data Use Case', async () => {
  beforeEach(async () => {
    sensorRepository = new InMemorySensorRepository()
    sut = new RegisterSensorDataUseCase(sensorRepository)
  })

  it('should be able to create a new Sensor Data', async () => {
    const { sensorData } = await sut.execute(sensorDataMock(1))

    console.log(sensorData)
    expect(sensorData).toEqual(expect.any(Object))
    expect(sensorData.equipmentId).toEqual(expect.any(String))
    expect(sensorData.value).toEqual(expect.any(Number))
    expect(sensorData.timestamp).toEqual(expect.any(String))
  })

  it('should not be able to create a new Sensor Data if it already exists', async () => {
    const mockedValue = sensorDataMock(1)
    await sut.execute(mockedValue)

    expect(async () => await sut.execute(mockedValue)).rejects.toBeInstanceOf(
      SensorDataAlreadyExistsError,
    )
  })
})
