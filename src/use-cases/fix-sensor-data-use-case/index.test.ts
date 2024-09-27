import { beforeEach, describe, expect, it } from 'vitest'

import { sensorDataEmptyMock } from '@/mocks/sensorDataMock'
import { InMemorySensorRepository } from '@/repositories/in-memory/in-memory-sensor-repository'

import { CSVReadFileError } from '../errors/csv-read-file-error'
import { EmptyFilePathError } from '../errors/empty-file-path-error'
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
    sensorRepository.register(dataToFix)
    const { fixedSensorData } = await sut.execute({
      filePath: 'src/uploads/tests/test.csv',
    })

    expect(fixedSensorData).toEqual(expect.any(Object))
    expect(fixedSensorData.equipmentId).toEqual(expect.any(String))
    expect(fixedSensorData.value).toEqual(expect.any(String))
    expect(fixedSensorData.timestamp).not.toHaveLength(0)
  })
  beforeEach(async () => {
    sensorRepository = new InMemorySensorRepository()
    sut = new FixSensorDataUseCase(sensorRepository)
  })

  it('should not be able to fix a Sensor Data values for empty csv file fields', async () => {
    const dataToFix = { ...sensorDataEmptyMock() }
    sensorRepository.register(dataToFix)

    expect(
      async () =>
        await sut.execute({
          filePath: 'src/uploads/tests/test-empty.csv',
        }),
    ).rejects.toBeInstanceOf(CSVReadFileError)
  })

  it('should not be able to fix a Sensor Data values for empty file path', async () => {
    const dataToFix = { ...sensorDataEmptyMock() }
    sensorRepository.register(dataToFix)

    expect(
      async () =>
        await sut.execute({
          filePath: '',
        }),
    ).rejects.toBeInstanceOf(EmptyFilePathError)
  })
})
