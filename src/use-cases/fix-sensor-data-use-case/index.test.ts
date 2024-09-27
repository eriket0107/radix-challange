import { beforeEach, describe, expect, it } from 'vitest'

import { sensorDataEmptyMock } from '@/mocks/sensorDataMock'
import { InMemorySensorRepository } from '@/repositories/in-memory/in-memory-sensor-repository'

import { FixSensorDataUseCase } from '.'

let sensorRepository: InMemorySensorRepository
let sut: FixSensorDataUseCase

describe('Shoulbd be able to fix Sensor data Use Case', async () => {
  beforeEach(async () => {
    sensorRepository = new InMemorySensorRepository()
    sut = new FixSensorDataUseCase(sensorRepository)
  })

  it('should be able to fix a Sensor Data values', async () => {
    const dataToFix = { ...sensorDataEmptyMock() }
    console.log('dataToFix', dataToFix)
    sensorRepository.register(dataToFix)
    const { fixedSensorData } = await sut.execute({
      filePath: 'src/use-cases/fix-sensor-data-use-case/test.csv',
    })

    expect(fixedSensorData).toEqual(expect.any(Object))
    expect(fixedSensorData.equipmentId).toEqual(expect.any(String))
    expect(fixedSensorData.value).toEqual(expect.any(String))
    expect(fixedSensorData.timestamp).not.toHaveLength(0)

    console.log('fixedSensorData', fixedSensorData)
  })
})
