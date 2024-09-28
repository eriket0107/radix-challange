import { beforeEach, describe, expect, it } from 'vitest'

import { sensorDataMock } from '@/mocks/sensorDataMock'
import { InMemorySensorRepository } from '@/repositories/in-memory/in-memory-sensor-repository'

import { GetMeanByPeriodUseCase } from '.'

let sensorRepository: InMemorySensorRepository
let sut: GetMeanByPeriodUseCase

describe('Register Sensor data Use Case', async () => {
  beforeEach(async () => {
    sensorRepository = new InMemorySensorRepository()
    sut = new GetMeanByPeriodUseCase(sensorRepository)
  })

  it('should be have to get value mean from a period', async () => {
    for (let i = 1; i <= 30; i++) {
      await sensorRepository.register({ ...sensorDataMock(i) })
    }

    const meanPeriod = await sut.execute()
    const mean24h = meanPeriod[0]
    const mean48h = meanPeriod[1]
    const meanOneweek = meanPeriod[2]
    const meanOneMoth = meanPeriod[3]

    expect(meanPeriod).toEqual(expect.any(Array))
    expect(meanPeriod).toHaveLength(4)
    expect(mean24h).toEqual(expect.any(Object))
    expect(mean48h).toEqual(expect.any(Object))
    expect(meanOneweek).toEqual(expect.any(Object))
    expect(meanOneMoth).toHaveProperty('period')
    expect(meanOneMoth).toHaveProperty('mean')
    expect(meanOneMoth.period).toEqual('1 Mês')
  })
})
